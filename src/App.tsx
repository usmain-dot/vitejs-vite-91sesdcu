import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Clock, Globe, Home, Briefcase, Heart, Scale, GraduationCap, UtensilsCrossed, Languages, Filter, MessageSquare, Calendar, Users, FileText, Sparkles, Edit, Trash2 } from 'lucide-react';

// Types
interface Service {
  id: number;
  name: string;
  category: 'housing' | 'healthcare' | 'legal' | 'employment' | 'education' | 'food' | 'language';
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
  mapView: string;
  listView: string;
  open: string;
  closed: string;
  callNow: string;
  getDirections: string;
  sendMessage: string;
  bookAppointment: string;
  noResults: string;
  distance: string;
  adminPanel: string;
  comingSoon: string;
  phase2: string;
  phase3: string;
  messaging: string;
  scheduling: string;
  forums: string;
  aiMatching: string;
  documents: string;
  caseManagement: string;
}

type LanguageCode = 'en' | 'es' | 'ar' | 'he' | 'sw';

const translations: Record<LanguageCode, Translation> = {
  en: {
    appName: "Bridge", tagline: "Connecting communities to essential services", search: "Search services...",
    allServices: "All Services", housing: "Housing", healthcare: "Healthcare", legal: "Legal Aid",
    employment: "Employment", education: "Education", food: "Food Assistance", language: "Language Classes",
    filters: "Filters", mapView: "Map View", listView: "List View", open: "Open", closed: "Closed",
    callNow: "Call Now", getDirections: "Get Directions", sendMessage: "Send Message",
    bookAppointment: "Book Appointment", noResults: "No services found. Try adjusting your filters.",
    distance: "mi away", adminPanel: "Admin Panel", comingSoon: "Coming Soon", phase2: "Phase 2 Features",
    phase3: "Phase 3 Features", messaging: "Direct Messaging", scheduling: "Appointment Scheduling",
    forums: "Community Forums", aiMatching: "AI Service Matching", documents: "Document Storage",
    caseManagement: "Case Management"
  },
  es: {
    appName: "Bridge", tagline: "Conectando comunidades con servicios esenciales", search: "Buscar servicios...",
    allServices: "Todos los Servicios", housing: "Vivienda", healthcare: "Salud", legal: "Ayuda Legal",
    employment: "Empleo", education: "Educación", food: "Asistencia Alimentaria", language: "Clases de Idiomas",
    filters: "Filtros", mapView: "Vista de Mapa", listView: "Vista de Lista", open: "Abierto", closed: "Cerrado",
    callNow: "Llamar Ahora", getDirections: "Obtener Direcciones", sendMessage: "Enviar Mensaje",
    bookAppointment: "Reservar Cita", noResults: "No se encontraron servicios.", distance: "mi de distancia",
    adminPanel: "Panel de Administración", comingSoon: "Próximamente", phase2: "Funciones Fase 2",
    phase3: "Funciones Fase 3", messaging: "Mensajería Directa", scheduling: "Programación de Citas",
    forums: "Foros Comunitarios", aiMatching: "Coincidencia de IA", documents: "Almacenamiento de Documentos",
    caseManagement: "Gestión de Casos"
  },
  ar: {
    appName: "Bridge", tagline: "ربط المجتمعات بالخدمات الأساسية", search: "البحث عن الخدمات...",
    allServices: "جميع الخدمات", housing: "الإسكان", healthcare: "الرعاية الصحية", legal: "المساعدة القانونية",
    employment: "التوظيف", education: "التعليم", food: "المساعدات الغذائية", language: "دروس اللغة",
    filters: "التصفية", mapView: "عرض الخريطة", listView: "عرض القائمة", open: "مفتوح", closed: "مغلق",
    callNow: "اتصل الآن", getDirections: "الحصول على الاتجاهات", sendMessage: "إرسال رسالة",
    bookAppointment: "حجز موعد", noResults: "لم يتم العثور على خدمات.", distance: "ميل بعيدا",
    adminPanel: "لوحة الإدارة", comingSoon: "قريبا", phase2: "ميزات المرحلة 2", phase3: "ميزات المرحلة 3",
    messaging: "المراسلة المباشرة", scheduling: "جدولة المواعيد", forums: "المنتديات المجتمعية",
    aiMatching: "مطابقة الذكاء الاصطناعي", documents: "تخزين المستندات", caseManagement: "إدارة الحالات"
  },
  he: {
    appName: "Bridge", tagline: "חיבור קהילות לשירותים חיוניים", search: "חיפוש שירותים...",
    allServices: "כל השירותים", housing: "דיור", healthcare: "בריאות", legal: "סיוע משפטי",
    employment: "תעסוקה", education: "חינוך", food: "סיוע במזון", language: "שיעורי שפה",
    filters: "מסננים", mapView: "תצוגת מפה", listView: "תצוגת רשימה", open: "פתוח", closed: "סגור",
    callNow: "התקשר עכשיו", getDirections: "קבל הוראות הגעה", sendMessage: "שלח הודעה",
    bookAppointment: "קבע פגישה", noResults: "לא נמצאו שירותים.", distance: "מייל משם",
    adminPanel: "פאנל ניהול", comingSoon: "בקרוב", phase2: "תכונות שלב 2", phase3: "תכונות שלב 3",
    messaging: "הודעות ישירות", scheduling: "תזמון פגישות", forums: "פורומים קהילתיים",
    aiMatching: "התאמת AI", documents: "אחסון מסמכים", caseManagement: "ניהול מקרים"
  },
  sw: {
    appName: "Bridge", tagline: "Kuunganisha jamii na huduma muhimu", search: "Tafuta huduma...",
    allServices: "Huduma Zote", housing: "Makazi", healthcare: "Huduma ya Afya", legal: "Msaada wa Kisheria",
    employment: "Ajira", education: "Elimu", food: "Msaada wa Chakula", language: "Madarasa ya Lugha",
    filters: "Vichujio", mapView: "Mtazamo wa Ramani", listView: "Mtazamo wa Orodha", open: "Wazi", closed: "Imefungwa",
    callNow: "Piga Simu Sasa", getDirections: "Pata Maelekezo", sendMessage: "Tuma Ujumbe",
    bookAppointment: "Weka Miadi", noResults: "Hakuna huduma zilizopatikana.", distance: "maili mbali",
    adminPanel: "Paneli ya Msimamizi", comingSoon: "Inakuja Hivi Karibuni", phase2: "Vipengele vya Awamu ya 2",
    phase3: "Vipengele vya Awamu ya 3", messaging: "Ujumbe wa Moja kwa Moja", scheduling: "Ratiba ya Miadi",
    forums: "Majukwaa ya Jamii", aiMatching: "Uoanishaji wa AI", documents: "Uhifadhi wa Hati",
    caseManagement: "Usimamizi wa Kesi"
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
  education: GraduationCap, food: UtensilsCrossed, language: Languages
};

const categoryColors: Record<Service['category'], { bg: string; text: string }> = {
  housing: { bg: '#dbeafe', text: '#1e40af' },      // Soft blue - trust & stability
  healthcare: { bg: '#dcfce7', text: '#15803d' },   // Soft green - health & healing
  legal: { bg: '#e0e7ff', text: '#4338ca' },        // Soft indigo - professionalism
  employment: { bg: '#fef3c7', text: '#b45309' },   // Soft amber - opportunity
  education: { bg: '#e9d5ff', text: '#7e22ce' },    // Soft purple - knowledge
  food: { bg: '#fed7aa', text: '#c2410c' },         // Soft orange - warmth & care
  language: { bg: '#ccfbf1', text: '#0f766e' }      // Soft teal - communication
};

export default function BridgeApp() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | Service['category']>('all');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

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
    const Icon = categoryIcons[service.category];
    return (
      <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-all" style={{ border: '1px solid #e5e7eb' }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: categoryColors[service.category].bg }}>
              <Icon className="w-6 h-6" style={{ color: categoryColors[service.category].text }} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <span className={`text-sm ${service.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                {service.isOpen ? t.open : t.closed}
              </span>
            </div>
          </div>
          {showAdminPanel && (
            <div className="flex gap-2">
              <button className="text-blue-600 hover:text-blue-800">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => setServices(services.filter(s => s.id !== service.id))} className="text-red-600 hover:text-red-800">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{service.address}</span></div>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{service.phone}</span></div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{service.hours}</span></div>
          <div className="flex items-center gap-2 text-blue-600 font-medium"><MapPin className="w-4 h-4" /><span>{service.distance} {t.distance}</span></div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
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
            onClick={() => alert(`${t.comingSoon}: ${t.messaging}`)}
            className="text-white py-2 px-3 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm" 
            title={t.comingSoon} 
            style={{ background: '#10b981' }}>
            <MessageSquare className="w-4 h-4" />{t.sendMessage}
          </button>
          <button 
            onClick={() => alert(`${t.comingSoon}: ${t.scheduling}`)}
            className="text-white py-2 px-3 rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm" 
            title={t.comingSoon} 
            style={{ background: '#f59e0b' }}>
            <Calendar className="w-4 h-4" />{t.bookAppointment}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#f9fafb' }}>
      <header className="shadow-lg sticky top-0 z-50" style={{ background: '#2a9df4' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-xl shadow-md relative" style={{ background: 'white' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Bridge arch */}
                  <path d="M2 20 Q14 8 26 20" stroke="#2a9df4" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  {/* Bridge supports */}
                  <line x1="8" y1="16" x2="8" y2="24" stroke="#2a9df4" strokeWidth="2.5"/>
                  <line x1="20" y1="16" x2="20" y2="24" stroke="#2a9df4" strokeWidth="2.5"/>
                  {/* People icons */}
                  <circle cx="6" cy="10" r="2" fill="#f59e0b"/>
                  <circle cx="14" cy="6" r="2" fill="#10b981"/>
                  <circle cx="22" cy="10" r="2" fill="#8b5cf6"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{ color: '#ffffff' }}>{t.appName}</h1>
                <p className="text-sm" style={{ color: '#ffffff', opacity: 0.95 }}>{t.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowAdminPanel(!showAdminPanel)} 
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm text-white"
                style={{ background: showAdminPanel ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)', border: showAdminPanel ? '2px solid white' : 'none' }}>
                <Edit className="w-5 h-5" /><span>{t.adminPanel}</span>
              </button>
              <div className="relative">
                <button onClick={() => setShowLanguageMenu(!showLanguageMenu)} 
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all shadow-sm text-white"
                  style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Globe className="w-5 h-5" /><span className="hidden sm:inline">{language.toUpperCase()}</span>
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

      <div className="shadow-sm" style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center" style={{ color: '#64748b' }}>
              <Search className="w-5 h-5" />
            </div>
            <input type="text" placeholder={t.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border rounded-xl transition-all text-lg"
              style={{ borderColor: '#cbd5e1', outline: 'none', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
              onFocus={(e) => e.target.style.borderColor = '#2a9df4'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
          </div>
        </div>
      </div>

      <div className="bg-white border-b sticky top-20 z-40" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-5">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all"
                  style={selectedCategory === cat.id 
                    ? { background: '#2a9df4', color: 'white', boxShadow: '0 2px 4px rgba(42,157,244,0.3)' } 
                    : { background: 'white', color: '#475569', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <Icon className="w-4 h-4" />{cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{filteredServices.length} {selectedCategory === 'all' ? t.allServices : categories.find(c => c.id === selectedCategory)?.label}</h2>
          <p className="text-gray-600">Click on any service to get directions or contact information</p>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t.noResults}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredServices.map(service => <ServiceCard key={service.id} service={service} />)}
          </div>
        )}
      </main>

      {/* Phase 2 & 3 Features */}
      <section className="py-16" style={{ background: '#f9fafb' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#1e293b' }}>{t.phase2}</h2>
            <p className="text-center text-gray-600 text-lg">Enhanced features launching soon</p>
          </div></div>
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
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4" style={{ borderColor: '#f59e0b' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#fed7aa' }}>
              <Calendar className="w-8 h-8" style={{ color: '#f59e0b' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t.scheduling}</h3>
            <p className="text-gray-600 text-sm">Book and manage appointments directly through the platform</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#fed7aa', color: '#c2410c' }}>
              {t.comingSoon}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4" style={{ borderColor: '#8b5cf6' }}>
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
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4" style={{ borderColor: '#06b6d4' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: '#ccfbf1' }}>
              <FileText className="w-8 h-8" style={{ color: '#06b6d4' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1e293b' }}>{t.documents}</h3>
            <p className="text-gray-600 text-sm">Secure storage for important documents and records</p>
            <div className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#ccfbf1', color: '#0f766e' }}>
              {t.comingSoon}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4" style={{ borderColor: '#ec4899' }}>
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
      </section>

      <footer className="text-white py-12" style={{ background: '#1e293b' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <p className="text-gray-200">© 2025 Bridge. {t.tagline}</p>
          <p className="text-gray-400 text-sm mt-2">Serving communities across New York State</p>
        </div>
      </footer>
    </div>
  );
}