import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Search, MapPin, Phone, Clock, Globe, Home, Briefcase, Heart, Scale, GraduationCap, UtensilsCrossed, Languages, Filter, MessageSquare, Calendar, Users, FileText, Sparkles, LogOut, Settings, Building2 } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { auth, db } from './firebase';
import Auth from './Auth';
import Messages from './Messages';
import Appointments from './Appointments';
import Admin from './Admin';
import OnlineResources from './OnlineResources';
import AboutSection from './AboutSection';
import CoworkingSpaces from './CoworkingSpaces';
import Schools from './Schools';
import CommunityFavorites from './CommunityFavorites';

// Types
interface Service {
  id: string;
  name: string;
  category: 'housing' | 'healthcare' | 'legal' | 'employment' | 'education' | 'food' | 'language' | 'mental health' | 'childcare';
  address: string;
  phone: string;
  hours: string;
  isOpen: boolean;
  distance: number;
  lat: number;
  lng: number;
  description: string;

   // Add these translation fields
  description_es?: string;
  description_ar?: string;
  description_he?: string;
  description_sw?: string;
  
  website?: string;
  email?: string;
}


const categoryIcons = {
  housing: Home, healthcare: Heart, legal: Scale, employment: Briefcase,
  education: GraduationCap, food: UtensilsCrossed, language: Languages,
  'mental health': Heart, childcare: Users
};

const categoryColors: Record<Service['category'], { bg: string; text: string }> = {
  housing: { bg: '#dbeafe', text: '#1e40af' },
  healthcare: { bg: '#dcfce7', text: '#15803d' },
  legal: { bg: '#e0e7ff', text: '#4338ca' },
  employment: { bg: '#fef3c7', text: '#b45309' },
  education: { bg: '#e9d5ff', text: '#7e22ce' },
  food: { bg: '#fed7aa', text: '#c2410c' },
  language: { bg: '#ccfbf1', text: '#0f766e' },
  'mental health': { bg: '#f3e8ff', text: '#6b21a8' },
  childcare: { bg: '#fef9c3', text: '#854d0e' }
};

// Check if service is currently open based on hours
const isServiceOpen = (hours: string): boolean => {
  if (!hours) return false;
  
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'short' });
  const currentTime = now.getHours() * 60 + now.getMinutes(); // minutes since midnight
  
  // Check if hours mention specific days
  const hoursLower = hours.toLowerCase();
  
  // Check for "24/7" or "24 hours"
  if (hoursLower.includes('24/7') || hoursLower.includes('24 hours')) {
    return true;
  }
  
  // Check for "closed"
  if (hoursLower.includes('closed') || hoursLower.includes('by appointment')) {
    return false;
  }
  
  // Parse "Mon-Fri" format
  const monFriPattern = /mon-fri|monday-friday|weekdays/i;
  if (monFriPattern.test(hours)) {
    const isWeekday = !['Sat', 'Sun'].includes(currentDay);
    if (!isWeekday) return false;
  }
  
  // Parse "Mon-Sat" format
  const monSatPattern = /mon-sat|monday-saturday/i;
  if (monSatPattern.test(hours)) {
    const isMonSat = currentDay !== 'Sun';
    if (!isMonSat) return false;
  }
  
  // Parse time ranges like "9AM-5PM" or "9:00-17:00"
  const timePattern = /(\d{1,2}):?(\d{2})?\s*(am|pm)?.*?(\d{1,2}):?(\d{2})?\s*(am|pm)?/i;
  const match = hours.match(timePattern);
  
  if (match) {
    let openHour = parseInt(match[1]);
    const openMin = parseInt(match[2] || '0');
    const openPeriod = match[3]?.toLowerCase();
    
    let closeHour = parseInt(match[4]);
    const closeMin = parseInt(match[5] || '0');
    const closePeriod = match[6]?.toLowerCase();
    
    // Convert to 24-hour format
    if (openPeriod === 'pm' && openHour !== 12) openHour += 12;
    if (openPeriod === 'am' && openHour === 12) openHour = 0;
    if (closePeriod === 'pm' && closeHour !== 12) closeHour += 12;
    if (closePeriod === 'am' && closeHour === 12) closeHour = 0;
    
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    return currentTime >= openTime && currentTime < closeTime;
  }
  
  // If we can't parse, default to open
  return true;
};

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authModalAnchor, setAuthModalAnchor] = useState<{ top: number; left: number } | null>(null);
  const showAuthModal = authModalAnchor !== null;
  const [showMessages, setShowMessages] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedService, setSelectedService] = useState<{ id: string; name: string } | null>(null);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Handle protected actions (messaging, appointments)
  const handleProtectedAction = (actionType: 'message' | 'appointment', service?: Service, event?: React.MouseEvent) => {
    if (!user) {
      if (event) {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const modalWidth = 360;
        const padding = 16;
        const centeredLeft = rect.left + rect.width / 2 - modalWidth / 2;
        const clampedLeft = Math.max(padding, Math.min(centeredLeft, window.innerWidth - modalWidth - padding));
        setAuthModalAnchor({
          top: rect.bottom + 8,
          left: clampedLeft,
        });
      }
    } else {
      if (service) {
        setSelectedService({ id: service.id, name: service.name });
        if (actionType === 'message') {
          setShowMessages(true);
        } else {
          setShowAppointments(true);
        }
      }
    }
  };

  // Calculate distance between two coordinates in miles
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
};
  // Load services from Firestore
useEffect(() => {
 const loadServices = async () => {
  try {
    const servicesRef = collection(db, 'services');
    const q = query(servicesRef, orderBy('name'));
    const querySnapshot = await getDocs(q);
    
    // Get user's location
    let userLat = 40.7128; // Default to NYC
    let userLng = -74.0060;
    
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
      } catch (geoError) {
        console.log('Using default NYC location');
      }
    }
    
    const loadedServices: Service[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const serviceLat = data.lat || 40.7128;
      const serviceLng = data.lng || -74.0060;
      
      loadedServices.push({
        id: doc.id,
        name: data.name || '',
        category: data.category || 'housing',
        address: data.address || '',
        phone: data.phone || '',
        hours: data.hours || '',
        isOpen: isServiceOpen(data.hours || ''),
        distance: calculateDistance(userLat, userLng, serviceLat, serviceLng),
        lat: serviceLat,
        lng: serviceLng,
        description: data.description || '',

        // Add these lines
        description_es: data.description_es,
        description_ar: data.description_ar,
        description_he: data.description_he,
        description_sw: data.description_sw,
  
        website: data.website,
        email: data.email
      });
    });
    
    setServices(loadedServices);
    console.log(`Loaded ${loadedServices.length} services from Firestore`);
  } catch (error) {
    console.error('Error loading services:', error);
    setServices([]);
  } finally {
    setServicesLoading(false);
  }
};

  loadServices();
}, []);

  const isRTL = i18n.language === 'ar' || i18n.language === 'he';
  const categories = [
  { id: 'all', label: t('categories.all'), icon: Filter },
  { id: 'housing', label: t('categories.housing'), icon: Home },
  { id: 'healthcare', label: t('categories.healthcare'), icon: Heart },
  { id: 'legal', label: t('categories.legal'), icon: Scale },
  { id: 'employment', label: t('categories.employment'), icon: Briefcase },
  { id: 'education', label: t('categories.education'), icon: GraduationCap },
  { id: 'food', label: t('categories.food'), icon: UtensilsCrossed },
  { id: 'mental health', label: t('categories.mentalHealth'), icon: Heart },
  { id: 'language', label: t('categories.language'), icon: Languages },
  { id: 'childcare', label: t('categories.childcare'), icon: Users }
];

 const filteredServices = useMemo(() => {
  const hasSearch = searchQuery.trim().length > 0;
  const hasCategory = selectedCategory !== '';

  if (!hasSearch && !hasCategory) return [];

  return services.filter(service => {
    const matchesCategory = !hasCategory || selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = !hasSearch ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}, [selectedCategory, searchQuery, services]);

  const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
    const Icon = categoryIcons[service.category] || Building2;

    // Get translated description
  const getDescription = () => {
  if (i18n.language === 'en') return service.description;
  const translatedKey = `description_${i18n.language}` as keyof Service;
    return (service[translatedKey] as string) || service.description;
  };
    return (
      <div id={`service-${service.id}`} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all" style={{
         border: '1px solid #e5e7eb',
         padding: '12px'
      }}
    >
      <div className="p-6">

        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: categoryColors[service.category]?.bg || '#e5e7eb' }}>
            <Icon className="w-6 h-6" style={{ color: categoryColors[service.category]?.text || '#374151' }} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <span className={`text-sm ${service.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                {service.isOpen ? t('service.open') : t('service.closed')}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{getDescription()}</p>
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{service.address}</span></div>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{service.phone}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{service.hours}</span></div>
          <div className="flex items-center gap-2 text-blue-600 font-medium"><MapPin className="w-4 h-4" /><span>{service.distance} {t('service.miAway')}</span></div>
        </div>

<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '8px' }}>
  <button 
    onClick={() => window.location.href = `tel:${service.phone}`}
    style={{ background: '#e8f4fe', color: '#1d6fa4', border: '1px solid #bfdffa', padding: '6px 10px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
    <Phone style={{ width: '13px', height: '13px', flexShrink: 0 }} /><span>{t('service.callNow')}</span>
  </button>
  <button 
    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`, '_blank')}
    style={{ background: '#eef0ff', color: '#3d52d5', border: '1px solid #c7cdf7', padding: '6px 10px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
    <MapPin style={{ width: '13px', height: '13px', flexShrink: 0 }} /><span>{t('service.getDirections')}</span>
  </button>
  <button 
    onClick={(e) => handleProtectedAction('message', service, e)}
    style={{ background: '#e8faf3', color: '#0f7a52', border: '1px solid #b0ecd5', padding: '6px 10px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
    <MessageSquare style={{ width: '13px', height: '13px', flexShrink: 0 }} /><span>{t('service.sendMessage')}</span>
  </button>
  <button 
    onClick={(e) => handleProtectedAction('appointment', service, e)}
    style={{ background: '#fef9ec', color: '#92650a', border: '1px solid #fde9a2', padding: '6px 10px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>
    <Calendar style={{ width: '13px', height: '13px', flexShrink: 0 }} /><span>{t('service.bookAppointment')}</span>
  </button>
</div>
</div>
  </div>
    );
  };

  // Show loading while checking auth OR loading services
if (authLoading || servicesLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#f9fafb' }}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: '#2a9df4' }}></div>
        <p className="text-gray-600">{t('service.loading')}</p>
      </div>
    </div>
  );
}

 return (
  <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#f9fafb' }}>
    
    {/* MODALS - MOVED TO TOP FOR PROPER Z-INDEX */}
    {/* Auth Modal */}
    {showAuthModal && authModalAnchor && (
      <>
        <div
          className="fixed inset-0 z-40"
          onClick={() => setAuthModalAnchor(null)}
        />
        <div
          className="fixed z-50 bg-white rounded-2xl shadow-2xl"
          style={{
            top: authModalAnchor.top,
            left: authModalAnchor.left,
            width: '360px',
            maxWidth: 'calc(100vw - 32px)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setAuthModalAnchor(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Auth onAuthSuccess={() => setAuthModalAnchor(null)} />
        </div>
      </>
    )}

    {/* Messages Modal */}
    {showMessages && (
      <div className="fixed inset-0 bg-white z-50">
        <Messages
          serviceId={selectedService?.id}
          serviceName={selectedService?.name}
          onClose={() => {
            setShowMessages(false);
            setSelectedService(null);
          }}
        />
      </div>
    )}

    {/* Appointments Modal */}
    {showAppointments && (
      <div className="fixed inset-0 bg-white z-50">
        <Appointments
          serviceId={selectedService?.id}
          serviceName={selectedService?.name}
          onClose={() => {
            setShowAppointments(false);
            setSelectedService(null);
          }}
        />
      </div>
    )}

    {/* Admin Dashboard */}
    {showAdmin && (
      <div className="fixed inset-0 bg-white z-50">
        <Admin onClose={() => setShowAdmin(false)} />
      </div>
    )}

    {/* About Modal */}
    {showAbout && (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#2a9df4', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ color: '#ffffff', fontWeight: 700, fontSize: '18px', margin: 0 }}>{t('about.title')}</h2>
          <button onClick={() => setShowAbout(false)} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
           {t('common.close')}
          </button>
        </div>
       <AboutSection /> 
      </div>
    )}
{/* Header */}
<header className="sticky top-0 z-50 text-white shadow-lg" style={{ background: '#2a9df4' }}>
  <div style={{ paddingLeft: '16px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px' }}>

    {/* Row 1: Logo icon + Bridge text + tagline + buttons all in one row on desktop, wraps on mobile */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Top row: icon + text */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '52px', height: '52px', background: '#ffffff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', padding: '6px', flexShrink: 0 }}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
            <path d="M6 32 Q24 14, 42 32" stroke="#2a9df4" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <rect x="6" y="32" width="3" height="10" fill="#2a9df4" rx="1.5" />
            <rect x="39" y="32" width="3" height="10" fill="#2a9df4" rx="1.5" />
            <circle cx="12" cy="24" r="3" fill="#10b981" />
            <circle cx="20" cy="18" r="3" fill="#f59e0b" />
            <circle cx="24" cy="14" r="3" fill="#8b5cf6" />
            <circle cx="28" cy="18" r="3" fill="#ec4899" />
            <circle cx="36" cy="24" r="3" fill="#06b6d4" />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', flex: 1 }}>
          <h1 style={{ color: '#ffffff', lineHeight: '1.1', margin: 0, fontSize: '22px', fontWeight: 700 }}>Bridge</h1>
          <p style={{ color: '#ffffff', opacity: 0.9, fontSize: '12px', margin: 0, lineHeight: '1.2' }}>{t('app.tagline')}</p>
        </div>

      </div>

      {/* Bottom row: buttons shown ONLY on mobile, under the tagline */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px' }}>
        {user ? (
          <>
            {user.email === 'usmaingumaa08@gmail.com' && (
              <button
                onClick={() => setShowAdmin(true)}
                style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', padding: '4px 10px', fontSize: '13px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                <Settings className="w-4 h-4" /><span>{t('nav.admin')}</span>
              </button>
            )}
            <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', padding: '4px 10px', fontSize: '13px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
              <LogOut className="w-4 h-4" /><span>{t('nav.logout')}</span>
            </button>
          </>
        ) : (
          <button onClick={(e) => { const rect = (e.currentTarget as HTMLElement).getBoundingClientRect(); setAuthModalAnchor({ top: rect.bottom + 8, left: 16 }); }} style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', padding: '4px 10px', fontSize: '13px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            <LogOut className="w-4 h-4" /><span>{t('nav.signIn')}</span>
          </button>
        )}
        <div className="relative">
          <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', padding: '4px 10px', fontSize: '13px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', color: '#ffffff' }}>
            <Globe className="w-4 h-4" /><span>{i18n.language.toUpperCase()}</span>
          </button>
          {showLanguageMenu && (
            <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-xl py-2 w-48 z-50">
              <button onClick={() => { i18n.changeLanguage('en'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">English</button>
              <button onClick={() => { i18n.changeLanguage('es'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Español</button>
              <button onClick={() => { i18n.changeLanguage('ar'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">العربية</button>
              <button onClick={() => { i18n.changeLanguage('he'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">עברית</button>
              <button onClick={() => { i18n.changeLanguage('sw'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Kiswahili</button>
            </div>
          )}
        </div>

        <button onClick={() => setShowAbout(true)} style={{ background: 'rgba(255,255,255,0.2)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', padding: '4px 10px', fontSize: '13px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap', cursor: 'pointer' }}>
          <span>{t('nav.about')}</span>
        </button>
      </div>

    </div>
  </div>
</header>
    

    {/* Main Content */}
    <main className="flex-1 py-8" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
      <div style={{ width: '100%' }}>
        {/* Search Bar */}
        <div className="mb-8 px-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 px-4">
           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', paddingBottom: '8px', paddingLeft: '4px', paddingRight: '4px' }}>
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
               <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    whiteSpace: 'nowrap',
                    background: selectedCategory === cat.id ? '#2563eb' : 'rgba(255,255,255,0.85)',
                    color: selectedCategory === cat.id ? '#ffffff' : '#374151',
                    border: selectedCategory === cat.id ? 'none' : '1px solid #d1d5db',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: selectedCategory === cat.id ? 600 : 500,
                    boxShadow: selectedCategory === cat.id ? '0 1px 4px rgba(37,99,235,0.3)' : '0 1px 2px rgba(0,0,0,0.06)',
                  }}>
                 <Icon style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                 <span>{cat.label}</span>      
               </button>
              );
            })}
          </div>

          {/* Counter showing filtered results */}
          <div className="mt-4 text-sm text-gray-600 px-4">
            {t('search.showing', { count: filteredServices.length, total: services.length })}
          </div>
        </div>

        {/* Services Grid */}
{servicesLoading ? (
  <div className="text-center py-16 px-6">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
    <p className="text-gray-600 text-lg">{t('service.loading')}</p>
  </div>
) : filteredServices.length === 0 && selectedCategory === '' && searchQuery.trim() === '' ? (
  <div className="text-center py-16 px-6">
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
    <p className="text-gray-500 text-lg font-medium">{t('service.selectPrompt')}</p>
    <p className="text-gray-400 text-sm mt-2">{t('service.browsePrompt')}</p>
  </div>
) : filteredServices.length === 0 ? (
  <div className="text-center py-16 px-6">
    <p className="text-gray-500 text-lg">{t('service.noResults')}</p>
  </div>
) : (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', padding: '0 24px' }}>
    {filteredServices.map(service => <ServiceCard key={service.id} service={service} />)}
  </div>
)}
      </div>
    </main>

<div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
  <CommunityFavorites /> 
  <CoworkingSpaces />
  <OnlineResources />
  <Schools />
</div>
    {/* Phase 2 & 3 Features */}
    <section className="py-16" style={{ background: '#f9fafb', paddingLeft: '12px', paddingRight: '12px' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>{t('phases.phase2Title')}</h2>
          <p className="text-center text-gray-600 text-lg">{t('phases.phase2Subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#10b981' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#d1fae5' }}>
              <MessageSquare className="w-8 h-8" style={{ color: '#10b981' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t('phases.messaging')}</h3>
            <p className="text-gray-600 text-sm">{t('phases.messagingDesc')}</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#d1fae5', color: '#059669' }}>
              {t('phases.comingSoon')}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#f59e0b' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#fed7aa' }}>
              <Calendar className="w-8 h-8" style={{ color: '#f59e0b' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t('phases.scheduling')}</h3>
            <p className="text-gray-600 text-sm">{t('phases.schedulingDesc')}</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#fed7aa', color: '#c2410c' }}>
              {t('phases.comingSoon')}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#8b5cf6' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#e9d5ff' }}>
              <Users className="w-8 h-8" style={{ color: '#8b5cf6' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t('phases.forums')}</h3>
            <p className="text-gray-600 text-sm">{t('phases.forumsDesc')}</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#e9d5ff', color: '#7e22ce' }}>
              {t('phases.comingSoon')}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>{t('phases.phase3Title')}</h2>
          <p className="text-center text-gray-600 text-lg">{t('phases.phase3Subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#2a9df4' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#dbeafe' }}>
              <Sparkles className="w-8 h-8" style={{ color: '#2a9df4' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t('phases.aiMatching')}</h3>
            <p className="text-gray-600 text-sm">{t('phases.aiMatchingDesc')}</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#dbeafe', color: '#1e40af' }}>
              {t('phases.comingSoon')}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#06b6d4' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#ccfbf1' }}>
              <FileText className="w-8 h-8" style={{ color: '#06b6d4' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t('phases.documents')}</h3>
            <p className="text-gray-600 text-sm">{t('phases.documentsDesc')}</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#ccfbf1', color: '#0f766e' }}>
              {t('phases.comingSoon')}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#ec4899' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#fce7f3' }}>
              <Briefcase className="w-8 h-8" style={{ color: '#ec4899' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t('phases.caseManagement')}</h3>
            <p className="text-gray-600 text-sm">{t('phases.caseManagementDesc')}</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#fce7f3', color: '#be185d' }}>
              {t('phases.comingSoon')}
            </div>
          </div>
        </div>
      </div>
    </section>

<footer className="py-12" style={{ background: '#1e293b', paddingLeft: '12px', paddingRight: '12px' }}>
  <div className="container mx-auto max-w-7xl text-center">
    <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
      {t('footer.rights')} {t('app.tagline')}
    </p>
    <p style={{ color: '#ffffff', fontSize: '14px', marginTop: '8px' }}>
      {t('footer.serving')}
    </p>
  </div>
</footer>


    {/* AI Search Assistant */}
{/* <AISearch
  services={services}
  onServiceSelect={handleAIServiceSelect}
/> */}
  </div>
);
}
