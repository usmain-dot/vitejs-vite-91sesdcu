import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, Globe, Home, Briefcase, Heart, Scale, GraduationCap, UtensilsCrossed, Languages, Filter, MessageSquare, Calendar, Users, FileText, Sparkles, LogOut, Settings } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { collection, getDocs, query, orderBy, getFirestore } from 'firebase/firestore';
import { auth } from './firebase';
import app from './firebase';
import Auth from './Auth';
import Messages from './Messages';
import Appointments from './Appointments';
import Admin from './Admin';
import AISearch from './AISearch';

// Initialize Firestore directly here
const db = getFirestore(app);

// Types
interface Service {
  id: number;
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
}

interface Translation {
  appName: string;
  tagline: string;
  search: string;
  allServices: string;
  housing: string;
  healthcare: string;
  legal: string;
  employment: string;
  education: string;
  food: string;
  language: string;
  filters: string;
  open: string;
  closed: string;
  callNow: string;
  getDirections: string;
  sendMessage: string;
  bookAppointment: string;
  noResults: string;
  distance: string;
  comingSoon: string;
  phase2: string;
  phase3: string;
  messaging: string;
  scheduling: string;
  forums: string;
  aiMatching: string;
  documents: string;
  caseManagement: string;
  signIn: string;
  loginToMessage: string;
  loginToBook: string;
}

type LanguageCode = 'en' | 'es' | 'ar' | 'he' | 'sw';

const translations: Record<LanguageCode, Translation> = {
  en: {
    appName: "Bridge", tagline: "Connecting communities to essential services", search: "Search services...",
    allServices: "All Services", housing: "Housing", healthcare: "Healthcare", legal: "Legal Aid",
    employment: "Employment", education: "Education", food: "Food Assistance", language: "Language Classes",
    filters: "Filters", open: "Open", closed: "Closed",
    callNow: "Call Now", getDirections: "Get Directions", sendMessage: "Send Message",
    bookAppointment: "Book Appointment", noResults: "No services found. Try adjusting your filters.",
    distance: "mi away", comingSoon: "Coming Soon", phase2: "Phase 2 Features",
    phase3: "Phase 3 Features", messaging: "Direct Messaging", scheduling: "Appointment Scheduling",
    forums: "Community Forums", aiMatching: "AI Service Matching", documents: "Document Storage",
    caseManagement: "Case Management", signIn: "Sign In", 
    loginToMessage: "Sign in to send messages", loginToBook: "Sign in to book appointments"
  },
  es: {
    appName: "Bridge", tagline: "Conectando comunidades con servicios esenciales", search: "Buscar servicios...",
    allServices: "Todos los Servicios", housing: "Vivienda", healthcare: "Salud", legal: "Ayuda Legal",
    employment: "Empleo", education: "Educación", food: "Asistencia Alimentaria", language: "Clases de Idiomas",
    filters: "Filtros", open: "Abierto", closed: "Cerrado",
    callNow: "Llamar Ahora", getDirections: "Obtener Direcciones", sendMessage: "Enviar Mensaje",
    bookAppointment: "Reservar Cita", noResults: "No se encontraron servicios.", distance: "mi de distancia",
    comingSoon: "Próximamente", phase2: "Funciones Fase 2",
    phase3: "Funciones Fase 3", messaging: "Mensajería Directa", scheduling: "Programación de Citas",
    forums: "Foros Comunitarios", aiMatching: "Coincidencia de IA", documents: "Almacenamiento de Documentos",
    caseManagement: "Gestión de Casos", signIn: "Iniciar Sesión",
    loginToMessage: "Inicie sesión para enviar mensajes", loginToBook: "Inicie sesión para reservar citas"
  },
  ar: {
    appName: "Bridge", tagline: "ربط المجتمعات بالخدمات الأساسية", search: "البحث عن الخدمات...",
    allServices: "جميع الخدمات", housing: "الإسكان", healthcare: "الرعاية الصحية", legal: "المساعدة القانونية",
    employment: "التوظيف", education: "التعليم", food: "المساعدات الغذائية", language: "دروس اللغة",
    filters: "التصفية", open: "مفتوح", closed: "مغلق",
    callNow: "اتصل الآن", getDirections: "الحصول على الاتجاهات", sendMessage: "إرسال رسالة",
    bookAppointment: "حجز موعد", noResults: "لم يتم العثور على خدمات.", distance: "ميل بعيدا",
    comingSoon: "قريبا", phase2: "ميزات المرحلة 2", phase3: "ميزات المرحلة 3",
    messaging: "المراسلة المباشرة", scheduling: "جدولة المواعيد", forums: "المنتديات المجتمعية",
    aiMatching: "مطابقة الذكاء الاصطناعي", documents: "تخزين المستندات", caseManagement: "إدارة الحالات",
    signIn: "تسجيل الدخول", loginToMessage: "تسجيل الدخول لإرسال الرسائل", loginToBook: "تسجيل الدخول لحجز المواعيد"
  },
  he: {
    appName: "Bridge", tagline: "חיבור קהילות לשירותים חיוניים", search: "חיפוש שירותים...",
    allServices: "כל השירותים", housing: "דיור", healthcare: "בריאות", legal: "סיוע משפטי",
    employment: "תעסוקה", education: "חינוך", food: "סיוע במזון", language: "שיעורי שפה",
    filters: "מסננים", open: "פתוח", closed: "סגור",
    callNow: "התקשר עכשיו", getDirections: "קבל הוראות הגעה", sendMessage: "שלח הודעה",
    bookAppointment: "קבע פגישה", noResults: "לא נמצאו שירותים.", distance: "מייל משם",
    comingSoon: "בקרוב", phase2: "תכונות שלב 2", phase3: "תכונות שלב 3",
    messaging: "הודעות ישירות", scheduling: "תזמון פגישות", forums: "פורומים קהילתיים",
    aiMatching: "התאמת AI", documents: "אחסון מסמכים", caseManagement: "ניהול מקרים",
    signIn: "התחבר", loginToMessage: "התחבר לשליחת הודעות", loginToBook: "התחבר לקביעת פגישות"
  },
  sw: {
    appName: "Bridge", tagline: "Kuunganisha jamii na huduma muhimu", search: "Tafuta huduma...",
    allServices: "Huduma Zote", housing: "Makazi", healthcare: "Huduma ya Afya", legal: "Msaada wa Kisheria",
    employment: "Ajira", education: "Elimu", food: "Msaada wa Chakula", language: "Madarasa ya Lugha",
    filters: "Vichujio", open: "Wazi", closed: "Imefungwa",
    callNow: "Piga Simu Sasa", getDirections: "Pata Maelekezo", sendMessage: "Tuma Ujumbe",
    bookAppointment: "Weka Miadi", noResults: "Hakuna huduma zilizopatikana.", distance: "maili mbali",
    comingSoon: "Inakuja Hivi Karibuni", phase2: "Vipengele vya Awamu ya 2",
    phase3: "Vipengele vya Awamu ya 3", messaging: "Ujumbe wa Moja kwa Moja", scheduling: "Ratiba ya Miadi",
    forums: "Majukwaa ya Jamii", aiMatching: "Uoanishaji wa AI", documents: "Uhifadhi wa Hati",
    caseManagement: "Usimamizi wa Kesi", signIn: "Ingia", 
    loginToMessage: "Ingia kutuma ujumbe", loginToBook: "Ingia kuweka miadi"
  }
};

const categoryIcons = {
  housing: Home, 
  healthcare: Heart, 
  legal: Scale, 
  employment: Briefcase,
  education: GraduationCap, 
  food: UtensilsCrossed, 
  language: Languages,
  'mental health': Heart,
  childcare: Users
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  housing: { bg: '#dbeafe', text: '#1e40af' },
  healthcare: { bg: '#dcfce7', text: '#15803d' },
  legal: { bg: '#e0e7ff', text: '#4338ca' },
  employment: { bg: '#fef3c7', text: '#b45309' },
  education: { bg: '#e9d5ff', text: '#7e22ce' },
  food: { bg: '#fed7aa', text: '#c2410c' },
  language: { bg: '#ccfbf1', text: '#0f766e' },
  'mental health': { bg: '#fce7f3', text: '#be185d' },
  childcare: { bg: '#ddd6fe', text: '#6d28d9' }
};

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedService, setSelectedService] = useState<{ id: number; name: string } | null>(null);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load services from Firestore
  useEffect(() => {
    const loadServices = async () => {
      try {
        console.log('Loading services from Firestore...');
        const servicesRef = collection(db, 'services');
        const q = query(servicesRef, orderBy('name'));
        const querySnapshot = await getDocs(q);
        
        const loadedServices: Service[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          loadedServices.push({
            id: doc.id as any, // Use Firestore doc ID
            name: data.name || '',
            category: data.category || 'housing',
            address: data.address || '',
            phone: data.phone || '',
            hours: data.hours || '',
            isOpen: data.active !== false, // Default to open if not specified
            distance: data.distance || 0,
            lat: data.lat || 0,
            lng: data.lng || 0,
            description: data.description || ''
          });
        });
        
        setServices(loadedServices);
        console.log(`✅ Loaded ${loadedServices.length} services from Firestore`);
      } catch (error) {
        console.error('❌ Error loading services:', error);
      } finally {
        setServicesLoading(false);
      }
    };

    loadServices();
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
  const handleProtectedAction = (actionType: 'message' | 'appointment', service?: Service) => {
    if (!user) {
      setShowAuthModal(true);
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

  // Handle AI service selection
  const handleAIServiceSelect = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      const element = document.getElementById(`service-${serviceId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.boxShadow = '0 0 0 3px #667eea';
        setTimeout(() => {
          element.style.boxShadow = '';
        }, 2000);
      }
    }
  };

  const t = translations[language];
  const isRTL = language === 'ar' || language === 'he';

  const categories = [
    { id: 'all' as const, label: t.allServices, icon: Filter },
    { id: 'housing' as const, label: t.housing, icon: Home },
    { id: 'healthcare' as const, label: t.healthcare, icon: Heart },
    { id: 'legal' as const, label: t.legal, icon: Scale },
    { id: 'employment' as const, label: t.employment, icon: Briefcase },
    { id: 'education' as const, label: t.education, icon: GraduationCap },
    { id: 'food' as const, label: t.food, icon: UtensilsCrossed },
    { id: 'language' as const, label: t.language, icon: Languages }
  ];

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, services]);

  const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
    const Icon = categoryIcons[service.category] || Home;
    const colors = categoryColors[service.category] || categoryColors.housing;
    
    return (
      <div id={`service-${service.id}`} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all" style={{ border: '1px solid #e5e7eb' }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: colors.bg }}>
              <Icon className="w-6 h-6" style={{ color: colors.text }} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <span className={`text-sm ${service.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                {service.isOpen ? t.open : t.closed}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{service.address}</span></div>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{service.phone}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{service.hours}</span></div>
          {service.distance > 0 && (
            <div className="flex items-center gap-2 text-blue-600 font-medium"><MapPin className="w-4 h-4" /><span>{service.distance} {t.distance}</span></div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => window.location.href = `tel:${service.phone}`}
            className="text-white py-2 px-3 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm" 
            style={{ background: '#2a9df4' }}>
            <Phone className="w-4 h-4" />{t.callNow}
          </button>
          <button 
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(service.address)}`, '_blank')}
            className="py-2 px-3 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm" 
            style={{ background: 'white', color: '#2a9df4', border: '1px solid #2a9df4' }}>
            <MapPin className="w-4 h-4" />{t.getDirections}
          </button>
          <button 
            onClick={() => handleProtectedAction('message', service)}
            className="text-white py-2 px-3 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm" 
            style={{ background: '#10b981' }}>
            <MessageSquare className="w-4 h-4" />{t.sendMessage}
          </button>
          <button 
            onClick={() => handleProtectedAction('appointment', service)}
            className="text-white py-2 px-3 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm" 
            style={{ background: '#f59e0b' }}>
            <Calendar className="w-4 h-4" />{t.bookAppointment}
          </button>
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
          <p className="text-gray-600">
            {authLoading ? 'Loading...' : `Loading ${services.length > 0 ? services.length : ''} services...`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#f9fafb' }}>
      {/* Header - Same as before */}
      <header className="sticky top-0 z-50 text-white shadow-lg" style={{ background: '#2a9df4' }}>
        <div className="container mx-auto py-4" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 20 Q16 8, 28 20" stroke="#2a9df4" strokeWidth="3" fill="none" />
                  <rect x="4" y="20" width="2" height="8" fill="#2a9df4" />
                  <rect x="26" y="20" width="2" height="8" fill="#2a9df4" />
                  <circle cx="10" cy="24" r="2" fill="#f59e0b" />
                  <circle cx="16" cy="24" r="2" fill="#10b981" />
                  <circle cx="22" cy="24" r="2" fill="#8b5cf6" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Bridge</h1>
                <p className="text-xs" style={{ color: '#ffffff', opacity: 0.9 }}>
                  {services.length} services available
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {user ? (
                <>
                  <button
                    onClick={() => setShowAdmin(true)}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Admin</span>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{user.displayName || 'User'}</p>
                      <p className="text-xs text-blue-100">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">{t.signIn}</span>
                </button>
              )}

              <div className="relative">
                <button 
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-all"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">{language.toUpperCase()}</span>
                </button>
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl py-2 w-48 z-50">
                    <button onClick={() => { setLanguage('en'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">English</button>
                    <button onClick={() => { setLanguage('es'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Español</button>
                    <button onClick={() => { setLanguage('ar'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">العربية</button>
                    <button onClick={() => { setLanguage('he'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">עברית</button>
                    <button onClick={() => { setLanguage('sw'); setShowLanguageMenu(false); }} className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">Kiswahili</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8 px-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 px-4">
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide max-w-6xl mx-auto">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all"
                    style={selectedCategory === cat.id 
                      ? { background: '#2a9df4', color: 'white', boxShadow: '0 2px 4px rgba(42,157,244,0.3)' } 
                      : { background: 'white', color: '#475569', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 px-4">
              <p className="text-gray-500 text-lg">{t.noResults}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
              {filteredServices.map(service => <ServiceCard key={service.id} service={service} />)}
            </div>
          )}
        </div>
      </main>

      {/* Footer and Modals - Same as before... */}
      <footer className="py-12" style={{ background: '#1e293b', paddingLeft: '12px', paddingRight: '12px' }}>
        <div className="container mx-auto max-w-7xl text-center">
          <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
            © 2025 Bridge. {t.tagline}
          </p>
          <p style={{ color: '#ffffff', fontSize: '14px', marginTop: '8px' }}>
            Serving communities across New York State
          </p>
        </div>
      </footer>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAuthModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Auth onAuthSuccess={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}

      {showMessages && (
        <div className="fixed inset-0 bg-white z-50">
          <Messages serviceId={selectedService?.id} serviceName={selectedService?.name} onClose={() => { setShowMessages(false); setSelectedService(null); }} />
        </div>
      )}

      {showAppointments && (
        <div className="fixed inset-0 bg-white z-50">
          <Appointments serviceId={selectedService?.id} serviceName={selectedService?.name} onClose={() => { setShowAppointments(false); setSelectedService(null); }} />
        </div>
      )}

      {showAdmin && (
        <div className="fixed inset-0 bg-white z-50">
          <Admin onClose={() => setShowAdmin(false)} />
        </div>
      )}

      <AISearch services={services} onServiceSelect={handleAIServiceSelect} />
    </div>
  );
}
