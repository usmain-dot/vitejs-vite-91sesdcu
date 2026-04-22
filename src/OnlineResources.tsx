import React, { useState } from 'react';
import { ExternalLink, Home, Zap, Users, ChevronRight } from 'lucide-react';

type LanguageCode = 'en' | 'es' | 'ar' | 'he' | 'sw';

interface OnlineResourcesProps {
  language?: LanguageCode;
}

const sectionTranslations: Record<LanguageCode, {
  title: string;
  subtitle: string;
  visitWebsite: string;
  housing: string;
  utilities: string;
  community: string;
  housingDesc: string;
  utilitiesDesc: string;
  communityDesc: string;
}> = {
  en: {
    title: 'Online Resources',
    subtitle: 'Essential websites and tools to help you settle in New York',
    visitWebsite: 'Visit Website',
    housing: 'Housing & Rent',
    utilities: 'Utilities & Internet',
    community: 'Community & Events',
    housingDesc: 'Find apartments, affordable housing, and know your renter rights',
    utilitiesDesc: 'Set up electricity, gas, and internet for your new home',
    communityDesc: 'Meet people, find events, and grow your career network',
  },
  es: {
    title: 'Recursos en Línea',
    subtitle: 'Sitios web y herramientas esenciales para ayudarte a establecerte en Nueva York',
    visitWebsite: 'Visitar Sitio',
    housing: 'Vivienda y Alquiler',
    utilities: 'Servicios e Internet',
    community: 'Comunidad y Eventos',
    housingDesc: 'Encuentra apartamentos, vivienda asequible y conoce tus derechos como inquilino',
    utilitiesDesc: 'Configura electricidad, gas e internet para tu nuevo hogar',
    communityDesc: 'Conoce personas, encuentra eventos y amplía tu red profesional',
  },
  ar: {
    title: 'الموارد الإلكترونية',
    subtitle: 'مواقع وأدوات أساسية لمساعدتك على الاستقرار في نيويورك',
    visitWebsite: 'زيارة الموقع',
    housing: 'السكن والإيجار',
    utilities: 'المرافق والإنترنت',
    community: 'المجتمع والفعاليات',
    housingDesc: 'ابحث عن شقق وسكن ميسور التكلفة واعرف حقوقك كمستأجر',
    utilitiesDesc: 'قم بإعداد الكهرباء والغاز والإنترنت لمنزلك الجديد',
    communityDesc: 'تعرف على أشخاص جدد واعثر على فعاليات ووسّع شبكة مهنيتك',
  },
  he: {
    title: 'משאבים מקוונים',
    subtitle: 'אתרים וכלים חיוניים שיעזרו לך להתיישב בניו יורק',
    visitWebsite: 'בקר באתר',
    housing: 'דיור ושכירות',
    utilities: 'שירותים ואינטרנט',
    community: 'קהילה ואירועים',
    housingDesc: 'מצא דירות, דיור בר השגה, וידע את זכויותיך כשוכר',
    utilitiesDesc: 'הגדר חשמל, גז ואינטרנט לבית החדש שלך',
    communityDesc: 'הכר אנשים, מצא אירועים והרחב את הרשת המקצועית שלך',
  },
  sw: {
    title: 'Rasilimali za Mtandaoni',
    subtitle: 'Tovuti na zana muhimu kukusaidia kukaa New York',
    visitWebsite: 'Tembelea Tovuti',
    housing: 'Makazi na Kodi',
    utilities: 'Huduma na Intaneti',
    community: 'Jamii na Matukio',
    housingDesc: 'Pata vyumba, makazi ya bei nafuu, na ujue haki zako kama mpangaji',
    utilitiesDesc: 'Weka umeme, gesi na intaneti kwa nyumba yako mpya',
    communityDesc: 'Kutana na watu, pata matukio, na kukuza mtandao wako wa kazi',
  },
};

const resourceGroups = [
  {
    id: 'housing',
    icon: Home,
    color: '#2a9df4',
    bgColor: '#dbeafe',
    resources: [
      {
        name: 'StreetEasy',
        description: 'NYC\'s #1 apartment search — rentals, sales, and neighborhood guides',
        url: 'https://streeteasy.com',
        tag: 'Rent Search',
        tagColor: '#2a9df4',
      },
      {
        name: 'Zillow NYC',
        description: 'Browse apartments and homes for rent or sale across all 5 boroughs',
        url: 'https://www.zillow.com/new-york-ny/',
        tag: 'Rent Search',
        tagColor: '#2a9df4',
      },
      {
        name: 'NYC Housing Connect',
        description: 'Apply for affordable and lottery housing units across New York City',
        url: 'https://housingconnect.nyc.gov',
        tag: 'Affordable',
        tagColor: '#10b981',
      },
      {
        name: 'Section 8 / HCV Program',
        description: 'NYCHA Housing Choice Voucher Program for low-income households',
        url: 'https://www1.nyc.gov/site/nycha/section-8/about-section-8.page',
        tag: 'Section 8',
        tagColor: '#10b981',
      },
      {
        name: 'NYC Rent Guidelines Board',
        description: 'Know your renter rights, rent stabilization rules, and tenant protections',
        url: 'https://rentguidelinesboard.cityofnewyork.us',
        tag: 'Tenant Rights',
        tagColor: '#f59e0b',
      },
    ],
  },
  {
    id: 'utilities',
    icon: Zap,
    color: '#f59e0b',
    bgColor: '#fef3c7',
    resources: [
      {
        name: 'Con Edison',
        description: 'Set up electricity and gas service for Manhattan, Bronx, and Westchester',
        url: 'https://www.coned.com',
        tag: 'Electricity & Gas',
        tagColor: '#f59e0b',
      },
      {
        name: 'National Grid',
        description: 'Gas service provider for Brooklyn, Queens, Staten Island, and Long Island',
        url: 'https://www.nationalgridus.com',
        tag: 'Gas',
        tagColor: '#f59e0b',
      },
      {
        name: 'Spectrum Internet',
        description: 'Internet and cable TV service available across all NYC boroughs',
        url: 'https://www.spectrum.com',
        tag: 'Internet',
        tagColor: '#8b5cf6',
      },
      {
        name: 'Optimum Internet',
        description: 'Broadband internet and TV services in NYC and surrounding areas',
        url: 'https://www.optimum.com',
        tag: 'Internet',
        tagColor: '#8b5cf6',
      },
      {
        name: 'LinkNYC — Free Wi-Fi',
        description: 'Free gigabit Wi-Fi kiosks at thousands of locations across NYC',
        url: 'https://www.link.nyc',
        tag: 'Free Wi-Fi',
        tagColor: '#10b981',
      },
      {
        name: 'Social Security Administration',
        description: 'Find your nearest SSA office location, hours, and services in NYC',
        url: 'https://www.ssa.gov/locator/',
        tag: 'Government',
        tagColor: '#6b7280',
      },
    ],
  },
  {
    id: 'community',
    icon: Users,
    color: '#10b981',
    bgColor: '#d1fae5',
    resources: [
      {
        name: 'Meetup — NYC Events',
        description: 'Find career networking, language exchange, and social meetups near you',
        url: 'https://www.meetup.com/cities/us/ny/new_york/',
        tag: 'Networking',
        tagColor: '#10b981',
      },
      {
        name: 'Eventbrite NYC',
        description: 'Free and paid community events, workshops, job fairs, and classes',
        url: 'https://www.eventbrite.com/d/ny--new-york/free--events/',
        tag: 'Events',
        tagColor: '#2a9df4',
      },
      {
        name: 'NYC Parks Events',
        description: 'Free concerts, fitness classes, cultural events in NYC parks year-round',
        url: 'https://www.nycgovparks.org/events',
        tag: 'Free Events',
        tagColor: '#10b981',
      },
      {
        name: 'NYPL Events & Classes',
        description: 'Free workshops, career help, and community programs at library branches',
        url: 'https://www.nypl.org/events',
        tag: 'Free Classes',
        tagColor: '#10b981',
      },
      {
        name: 'LinkedIn Local NYC',
        description: 'In-person professional networking events across New York City',
        url: 'https://www.linkedin.com/search/results/events/?keywords=linkedin+local+new+york',
        tag: 'Career',
        tagColor: '#2a9df4',
      },
      {
        name: 'NYC Career Fairs',
        description: 'Upcoming job fairs and hiring events across all 5 boroughs',
        url: 'https://www.eventbrite.com/d/ny--new-york/job-fair/',
        tag: 'Jobs',
        tagColor: '#f59e0b',
      },
    ],
  },
];

export default function OnlineResources({ language = 'en' }: OnlineResourcesProps) {
  const [activeTab, setActiveTab] = useState<'housing' | 'utilities' | 'community' | ''>('');
  const t = sectionTranslations[language] || sectionTranslations['en'];

  const tabConfig = [
    { id: 'housing' as const, label: t.housing, desc: t.housingDesc, icon: Home, color: '#2a9df4', bg: '#dbeafe' },
    { id: 'utilities' as const, label: t.utilities, desc: t.utilitiesDesc, icon: Zap, color: '#f59e0b', bg: '#fef3c7' },
    { id: 'community' as const, label: t.community, desc: t.communityDesc, icon: Users, color: '#10b981', bg: '#d1fae5' },
  ];

  const activeGroup = resourceGroups.find(g => g.id === activeTab) || resourceGroups[0];
  const activeTabConfig = tabConfig.find(tab => tab.id === activeTab) || tabConfig[0];

  return (
    <section className="py-16" style={{ background: '#ffffff', borderTop: '1px solid #e5e7eb' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3" style={{ color: '#1e293b' }}>{t.title}</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row mb-8 justify-center flex-wrap" style={{ gap: '12px' }}>
          {tabConfig.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-3 px-6 py-4 rounded-xl transition-all text-left sm:text-center"
                style={{
                  background: isActive ? tab.color : '#f9fafb',
                  color: isActive ? '#ffffff' : '#374151',
                  border: isActive ? 'none' : '1px solid #e5e7eb',
                  boxShadow: isActive ? `0 4px 14px ${tab.color}40` : 'none',
                  transform: isActive ? 'translateY(-2px)' : 'none',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: isActive ? 'rgba(255,255,255,0.2)' : tab.bg }}
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? '#fff' : tab.color }} />
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: '14px' }}>{tab.label}</p>
                  <p className="text-xs opacity-75 hidden sm:block max-w-[180px]">{tab.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Resource Cards */}
        {activeTab === '' ? (
          <div className="text-center py-16">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌐</div>
            <p className="text-gray-500 text-lg font-medium">Select a category above to explore resources</p>
            <p className="text-gray-400 text-sm mt-2">Housing, Utilities, and Community resources available</p>
          </div>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {activeGroup.resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-6 flex flex-col gap-4 hover:shadow-lg transition-all"
              style={{ border: '1px solid #e5e7eb', textDecoration: 'none' }}
            >
              {/* Tag */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: `${resource.tagColor}18`, color: resource.tagColor }}
                >
                  {resource.tag}
                </span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  style={{ background: activeTabConfig.bg }}
                >
                  <ExternalLink className="w-4 h-4" style={{ color: activeTabConfig.color }} />
                </div>
              </div>

              {/* Name */}
              <div>
                <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-blue-600 transition-colors">
                  {resource.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{resource.description}</p>
              </div>

              {/* Visit link */}
              <div
                className="flex items-center gap-1 text-sm font-medium mt-auto"
                style={{ color: activeTabConfig.color }}
              >
                {t.visitWebsite}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

          ))}
        </div>
        )}
     </div>
    </section>
  );
}