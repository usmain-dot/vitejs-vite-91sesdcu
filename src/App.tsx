import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, Globe, Home, Briefcase, Heart, Scale, GraduationCap, UtensilsCrossed, Languages, Filter, MessageSquare, Calendar, Users, FileText, Sparkles, LogOut, Settings, Building2 } from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { auth, db } from './firebase';
import Auth from './Auth';
import Messages from './Messages';
import Appointments from './Appointments';
import Admin from './Admin';
import AISearch from './AISearch';

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
    mentalHealth: "Mental Health", childcare: "Childcare",
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
    mentalHealth: "Salud Mental", childcare: "Cuidado Infantil",
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
    mentalHealth: "الصحة النفسية", childcare: "رعاية الأطفال",
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
     mentalHealth: "בריאות נפש", childcare: "טיפול בילדים",
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
     mentalHealth: "Afya ya Akili", childcare: "Huduma za Watoto",
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

const initialServices: Service[] = [
  {
    id: 1,
    name: "International Rescue Committee (IRC) NYC",
    category: "employment",
    address: "122 East 42nd Street, New York, NY 10168",
    phone: "(212) 377-4728",
    hours: "Mon-Fri: 8AM-5PM",
    isOpen: true,
    distance: 1.2,
    lat: 40.7516,
    lng: -73.9771,
    description: "Job training, resume help, ESL classes, and resettlement services for refugees and asylum seekers"
  },
  {
    id: 2,
    name: "Catholic Charities of New York",
    category: "housing",
    address: "1011 1st Avenue, New York, NY 10022",
    phone: "(212) 371-1000",
    hours: "Mon-Fri: 9AM-5PM",
    isOpen: true,
    distance: 2.3,
    lat: 40.7549,
    lng: -73.9681,
    description: "Emergency shelter, transitional housing, and permanent supportive housing for displaced families"
  },
  {
    id: 3,
    name: "NYC Health + Hospitals/Bellevue",
    category: "healthcare",
    address: "462 1st Avenue, New York, NY 10016",
    phone: "(212) 562-4141",
    hours: "24/7 Emergency Care",
    isOpen: true,
    distance: 0.8,
    lat: 40.7390,
    lng: -73.9754,
    description: "Full-service hospital with multilingual staff and specialized refugee health program"
  },
  {
    id: 4,
    name: "The Legal Aid Society",
    category: "legal",
    address: "199 Water Street, New York, NY 10038",
    phone: "(212) 577-3300",
    hours: "Mon-Fri: 9AM-5PM",
    isOpen: true,
    distance: 3.1,
    lat: 40.7065,
    lng: -74.0047,
    description: "Free legal representation for immigration, housing, and family law matters"
  },
  {
    id: 5,
    name: "Interfaith Center of New York",
    category: "language",
    address: "40 Broad Street, Suite 1600, New York, NY 10004",
    phone: "(212) 870-3510",
    hours: "Mon-Fri: 9AM-6PM",
    isOpen: true,
    distance: 3.5,
    lat: 40.7058,
    lng: -74.0113,
    description: "Free ESL classes, cultural orientation, and community integration programs"
  },
  {
    id: 6,
    name: "Food Bank For New York City",
    category: "food",
    address: "39 Broadway, 10th Floor, New York, NY 10006",
    phone: "(212) 566-7855",
    hours: "Mon-Fri: 9AM-5PM",
    isOpen: true,
    distance: 3.2,
    lat: 40.7074,
    lng: -74.0125,
    description: "Emergency food assistance, meal programs, and nutrition education citywide"
  },
  {
    id: 7,
    name: "CUNY Adult Education Program",
    category: "education",
    address: "205 East 42nd Street, New York, NY 10017",
    phone: "(646) 664-2947",
    hours: "Mon-Thu: 6PM-9PM",
    isOpen: false,
    distance: 1.5,
    lat: 40.7505,
    lng: -73.9733,
    description: "GED classes, vocational training, and college preparation programs"
  },
  {
    id: 8,
    name: "New York Legal Assistance Group (NYLAG)",
    category: "legal",
    address: "7 Hanover Square, 18th Floor, New York, NY 10004",
    phone: "(212) 613-5000",
    hours: "Mon-Fri: 9AM-6PM",
    isOpen: true,
    distance: 3.3,
    lat: 40.7047,
    lng: -74.0095,
    description: "Free immigration law services, housing rights advocacy, and family law assistance"
  },
  {
    id: 9,
    name: "Coalition for the Homeless",
    category: "housing",
    address: "129 Fulton Street, New York, NY 10038",
    phone: "(212) 776-2000",
    hours: "Mon-Fri: 9AM-5PM",
    isOpen: true,
    distance: 2.9,
    lat: 40.7105,
    lng: -74.0048,
    description: "Emergency shelter placement, eviction prevention, and housing assistance programs"
  },
  {
    id: 10,
    name: "Mount Sinai Immigrant Health Program",
    category: "healthcare",
    address: "1468 Madison Avenue, New York, NY 10029",
    phone: "(212) 241-6500",
    hours: "Mon-Sat: 8AM-8PM",
    isOpen: true,
    distance: 4.2,
    lat: 40.7889,
    lng: -73.9520,
    description: "Multilingual healthcare, mental health services, and health insurance enrollment assistance"
  }
];

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

export default function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
      // Scroll to the service card
      const element = document.getElementById(`service-${serviceId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Highlight the service briefly
        element.style.boxShadow = '0 0 0 3px #667eea';
        setTimeout(() => {
          element.style.boxShadow = '';
        }, 2000);
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
        isOpen: true,
        distance: calculateDistance(userLat, userLng, serviceLat, serviceLng),
        lat: serviceLat,
        lng: serviceLng,
        description: data.description || ''
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

  const t = translations[language];
  const isRTL = language === 'ar' || language === 'he';

  const categories = [
  { id: 'all', label: t.allServices, icon: Filter }, 
  { id: 'housing', label: t.housing, icon: Home }, 
  { id: 'healthcare', label: t.healthcare, icon: Heart },
  { id: 'legal', label: t.legal, icon: Scale }, 
  { id: 'employment', label: t.employment, icon: Briefcase },
  { id: 'education', label: t.education, icon: GraduationCap }, 
  { id: 'food', label: t.food, icon: UtensilsCrossed },
  { id: 'mental health', label: t.mentalHealth, icon: Heart },
  { id: 'language', label: t.language, icon: Languages },
  { id: 'childcare', label: t.childcare, icon: Users }
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
    const Icon = categoryIcons[service.category] || Building2;
    return (
      <div id={`service-${service.id}`} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all" style={{ border: '1px solid #e5e7eb' }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: categoryColors[service.category]?.bg || '#e5e7eb' }}>
            <Icon className="w-6 h-6" style={{ color: categoryColors[service.category]?.text || '#374151' }} />
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
          <div className="flex items-center gap-2 text-blue-600 font-medium"><MapPin className="w-4 h-4" /><span>{service.distance} {t.distance}</span></div>
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
        <p className="text-gray-600">Loading services...</p>
      </div>
    </div>
  );
}

 return (
  <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#f9fafb' }}>
    
    {/* MODALS - MOVED TO TOP FOR PROPER Z-INDEX */}
    {/* Auth Modal */}
    {showAuthModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAuthModal(false)}>
        <div className="bg-white rounded-2xl max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowAuthModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Auth onAuthSuccess={() => setShowAuthModal(false)} />
        </div>
      </div>
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

    {/* Header */}
    <header className="sticky top-0 z-50 text-white shadow-lg" style={{ background: '#2a9df4' }}>
      <div className="container mx-auto py-4" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <div className="flex items-center justify-between">
         {/* Logo */}
<div className="flex items-center gap-3">
  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-xl p-2">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Bridge arch - thicker and more visible */}
      <path 
        d="M6 32 Q24 14, 42 32" 
        stroke="#2a9df4" 
        strokeWidth="4" 
        fill="none" 
        strokeLinecap="round"
      />
      {/* Bridge pillars */}
      <rect x="6" y="32" width="3" height="10" fill="#2a9df4" rx="1.5" />
      <rect x="39" y="32" width="3" height="10" fill="#2a9df4" rx="1.5" />
      
      {/* 5 Language dots - BIGGER and more visible */}
      <circle cx="12" cy="24" r="3" fill="#10b981" />   {/* Green */}
      <circle cx="20" cy="18" r="3" fill="#f59e0b" />   {/* Orange */}
      <circle cx="24" cy="14" r="3" fill="#8b5cf6" />   {/* Purple */}
      <circle cx="28" cy="18" r="3" fill="#ec4899" />   {/* Pink */}
      <circle cx="36" cy="24" r="3" fill="#06b6d4" />   {/* Cyan */}
    </svg>
  </div>
  <div>
    <h1 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Bridge</h1>
    <p className="text-xs" style={{ color: '#ffffff', opacity: 0.9 }}>Connecting Communities to essential services</p>
  </div>
</div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <button
                  onClick={() => setShowAdmin(true)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all flex items-center gap-2"
                  title="Admin Dashboard"
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

            {/* Language Selector */}
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 shadow-sm"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Counter showing filtered results */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Showing {filteredServices.length} of {services.length} services
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

    {/* Phase 2 & 3 Features */}
    <section className="py-16" style={{ background: '#f9fafb', paddingLeft: '12px', paddingRight: '12px' }}>
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>{t.phase2}</h2>
          <p className="text-center text-gray-600 text-lg">Enhanced features launching soon</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#10b981' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#d1fae5' }}>
              <MessageSquare className="w-8 h-8" style={{ color: '#10b981' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t.messaging}</h3>
            <p className="text-gray-600 text-sm">Real-time chat with service providers for quick questions and support</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#d1fae5', color: '#059669' }}>
              {t.comingSoon}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#f59e0b' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#fed7aa' }}>
              <Calendar className="w-8 h-8" style={{ color: '#f59e0b' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t.scheduling}</h3>
            <p className="text-gray-600 text-sm">Book and manage appointments directly through the platform</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#fed7aa', color: '#c2410c' }}>
              {t.comingSoon}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#8b5cf6' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#e9d5ff' }}>
              <Users className="w-8 h-8" style={{ color: '#8b5cf6' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t.forums}</h3>
            <p className="text-gray-600 text-sm">Connect with community members and share experiences</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#e9d5ff', color: '#7e22ce' }}>
              {t.comingSoon}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>{t.phase3}</h2>
          <p className="text-center text-gray-600 text-lg">Advanced capabilities for personalized support</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#2a9df4' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#dbeafe' }}>
              <Sparkles className="w-8 h-8" style={{ color: '#2a9df4' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t.aiMatching}</h3>
            <p className="text-gray-600 text-sm">AI-powered recommendations based on your unique needs</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#dbeafe', color: '#1e40af' }}>
              {t.comingSoon}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#06b6d4' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#ccfbf1' }}>
              <FileText className="w-8 h-8" style={{ color: '#06b6d4' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t.documents}</h3>
            <p className="text-gray-600 text-sm">Secure storage for important documents and records</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#ccfbf1', color: '#0f766e' }}>
              {t.comingSoon}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center border-t-4 hover:shadow-lg transition-all" style={{ borderColor: '#ec4899' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#fce7f3' }}>
              <Briefcase className="w-8 h-8" style={{ color: '#ec4899' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t.caseManagement}</h3>
            <p className="text-gray-600 text-sm">Track your service journey and document progress</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#fce7f3', color: '#be185d' }}>
              {t.comingSoon}
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer className="py-12" style={{ background: '#1e293b', paddingLeft: '12px', paddingRight: '12px' }}>
  <div className="container mx-auto max-w-7xl text-center">
    <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
      © 2025 Bridge. {t.tagline}
    </p>
    <p style={{ color: '#ffffff', fontSize: '14px', marginTop: '8px' }}>
      Serving communities across New York State
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
