import React, { useState, useMemo } from 'react';
import { GraduationCap, MapPin, Phone, Globe, ExternalLink, Filter } from 'lucide-react';

type LanguageCode = 'en' | 'es' | 'ar' | 'he' | 'sw';
type SchoolType = 'all' | 'university' | 'college' | 'high school' | 'middle school' | 'primary school';
type Borough = 'all' | 'Manhattan' | 'Brooklyn' | 'Queens' | 'Bronx' | 'Staten Island';
type Language = 'all' | 'English' | 'Spanish' | 'Arabic' | 'Chinese' | 'French';

interface School {
  id: number;
  name: string;
  type: SchoolType;
  borough: Borough;
  address: string;
  phone: string;
  website: string;
  languages: string[];
  description: string;
  grades?: string;
}

const schools: School[] = [
  // Universities
  { id: 1, name: 'New York University (NYU)', type: 'university', borough: 'Manhattan', address: '70 Washington Square S, New York, NY 10012', phone: '(212) 998-1212', website: 'https://www.nyu.edu', languages: ['English'], description: 'Private research university with programs in arts, sciences, business, and law.', grades: 'Undergraduate & Graduate' },
  { id: 2, name: 'Columbia University', type: 'university', borough: 'Manhattan', address: '116th St & Broadway, New York, NY 10027', phone: '(212) 854-1754', website: 'https://www.columbia.edu', languages: ['English'], description: 'Ivy League research university offering undergraduate and graduate programs.', grades: 'Undergraduate & Graduate' },
  { id: 3, name: 'City College of New York (CCNY)', type: 'university', borough: 'Manhattan', address: '160 Convent Ave, New York, NY 10031', phone: '(212) 650-7000', website: 'https://www.ccny.cuny.edu', languages: ['English', 'Spanish'], description: 'CUNY flagship college offering affordable education in engineering, arts, and sciences.', grades: 'Undergraduate & Graduate' },
  { id: 4, name: 'Brooklyn College', type: 'university', borough: 'Brooklyn', address: '2900 Bedford Ave, Brooklyn, NY 11210', phone: '(718) 951-5000', website: 'https://www.brooklyn.cuny.edu', languages: ['English', 'Spanish'], description: 'CUNY liberal arts college with strong programs in business, education, and arts.', grades: 'Undergraduate & Graduate' },
  { id: 5, name: 'Queens College', type: 'university', borough: 'Queens', address: '65-30 Kissena Blvd, Queens, NY 11367', phone: '(718) 997-5000', website: 'https://www.qc.cuny.edu', languages: ['English', 'Spanish', 'Chinese'], description: 'CUNY college offering diverse programs with strong ESL support for immigrants.', grades: 'Undergraduate & Graduate' },
  { id: 6, name: 'Lehman College', type: 'university', borough: 'Bronx', address: '250 Bedford Park Blvd W, Bronx, NY 10468', phone: '(718) 960-8000', website: 'https://www.lehman.cuny.edu', languages: ['English', 'Spanish'], description: 'CUNY college serving the Bronx with strong bilingual and immigrant support programs.', grades: 'Undergraduate & Graduate' },
  { id: 7, name: 'College of Staten Island', type: 'university', borough: 'Staten Island', address: '2800 Victory Blvd, Staten Island, NY 10314', phone: '(718) 982-2000', website: 'https://www.csi.cuny.edu', languages: ['English'], description: 'CUNY college offering undergraduate and graduate programs on Staten Island.', grades: 'Undergraduate & Graduate' },
  { id: 8, name: 'Fordham University', type: 'university', borough: 'Bronx', address: '441 E Fordham Rd, Bronx, NY 10458', phone: '(718) 817-1000', website: 'https://www.fordham.edu', languages: ['English', 'Spanish'], description: 'Jesuit research university with programs in business, law, and social services.', grades: 'Undergraduate & Graduate' },

  // Colleges
  { id: 9, name: 'Borough of Manhattan Community College', type: 'college', borough: 'Manhattan', address: '199 Chambers St, New York, NY 10007', phone: '(212) 220-8000', website: 'https://www.bmcc.cuny.edu', languages: ['English', 'Spanish', 'Chinese'], description: 'Affordable 2-year CUNY college with strong ESL and immigrant support programs.', grades: 'Associate Degrees' },
  { id: 10, name: 'Bronx Community College', type: 'college', borough: 'Bronx', address: '2155 University Ave, Bronx, NY 10453', phone: '(718) 289-5100', website: 'https://www.bcc.cuny.edu', languages: ['English', 'Spanish'], description: '2-year CUNY college serving the Bronx community with workforce development programs.', grades: 'Associate Degrees' },
  { id: 11, name: 'Queensborough Community College', type: 'college', borough: 'Queens', address: '222-05 56th Ave, Bayside, NY 11364', phone: '(718) 631-6262', website: 'https://www.qcc.cuny.edu', languages: ['English', 'Spanish', 'Chinese'], description: '2-year CUNY college with strong ESL programs and workforce training.', grades: 'Associate Degrees' },
  { id: 12, name: 'Kingsborough Community College', type: 'college', borough: 'Brooklyn', address: '2001 Oriental Blvd, Brooklyn, NY 11235', phone: '(718) 265-5343', website: 'https://www.kbcc.cuny.edu', languages: ['English', 'Spanish', 'Russian'], description: '2-year CUNY college with ESL programs and career training for new immigrants.', grades: 'Associate Degrees' },

  // High Schools
  { id: 13, name: 'Stuyvesant High School', type: 'high school', borough: 'Manhattan', address: '345 Chambers St, New York, NY 10282', phone: '(212) 312-4800', website: 'https://stuy.enschool.org', languages: ['English'], description: 'Specialized public high school known for excellence in math and science.', grades: '9-12' },
  { id: 14, name: 'Bronx High School of Science', type: 'high school', borough: 'Bronx', address: '75 W 205th St, Bronx, NY 10468', phone: '(718) 817-7700', website: 'https://www.bxscience.edu', languages: ['English'], description: 'Specialized public high school focused on science, math, and technology.', grades: '9-12' },
  { id: 15, name: 'Brooklyn Technical High School', type: 'high school', borough: 'Brooklyn', address: '29 Fort Greene Pl, Brooklyn, NY 11217', phone: '(718) 804-6400', website: 'https://www.bths.edu', languages: ['English'], description: 'Specialized public high school with programs in engineering and technology.', grades: '9-12' },
  { id: 16, name: 'International High School at Prospect Heights', type: 'high school', borough: 'Brooklyn', address: '883 Classon Ave, Brooklyn, NY 11225', phone: '(718) 230-6750', website: 'https://www.ihsph.org', languages: ['English', 'Spanish', 'Arabic', 'French'], description: 'Public high school specifically designed for recent immigrant students.', grades: '9-12' },
  { id: 17, name: 'International High School at Lafayette', type: 'high school', borough: 'Brooklyn', address: '2630 Benson Ave, Brooklyn, NY 11214', phone: '(718) 714-4660', website: 'https://www.ihslafayette.org', languages: ['English', 'Spanish', 'Arabic', 'Chinese'], description: 'High school dedicated to serving recent immigrant students with multilingual support.', grades: '9-12' },
  { id: 18, name: 'Queens International High School', type: 'high school', borough: 'Queens', address: '74-20 Commonwealth Blvd, Queens, NY 11426', phone: '(718) 749-2040', website: 'https://www.queensinternational.org', languages: ['English', 'Spanish', 'Arabic', 'Chinese'], description: 'High school for recent immigrants with strong multilingual academic support.', grades: '9-12' },

  // Middle Schools
  { id: 19, name: 'NYC Lab Middle School', type: 'middle school', borough: 'Manhattan', address: '333 W 17th St, New York, NY 10011', phone: '(212) 691-6119', website: 'https://www.nyclabschool.org', languages: ['English', 'Spanish'], description: 'Progressive middle school with project-based learning and ESL support.', grades: '6-8' },
  { id: 20, name: 'IS 318 Eugenio Maria de Hostos', type: 'middle school', borough: 'Brooklyn', address: '101 Walton St, Brooklyn, NY 11206', phone: '(718) 388-1299', website: 'https://www.is318.org', languages: ['English', 'Spanish'], description: 'Public middle school with strong chess program and bilingual education.', grades: '6-8' },
  { id: 21, name: 'MS 137 America\'s School of Heroes', type: 'middle school', borough: 'Queens', address: '142-01 Franklin Ave, Queens, NY 11355', phone: '(718) 762-4800', website: 'https://www.ms137.org', languages: ['English', 'Spanish', 'Chinese'], description: 'Middle school serving diverse immigrant communities in Queens.', grades: '6-8' },
  { id: 22, name: 'Bronx Academy of Letters', type: 'middle school', borough: 'Bronx', address: '1153 Plimpton Ave, Bronx, NY 10452', phone: '(718) 293-2200', website: 'https://www.bronxacademyofletters.org', languages: ['English', 'Spanish'], description: 'Middle and high school focused on literacy and writing with bilingual support.', grades: '6-12' },

  // Primary Schools
  { id: 23, name: 'PS 158 Baylard Taylor', type: 'primary school', borough: 'Manhattan', address: '1458 York Ave, New York, NY 10075', phone: '(212) 744-8139', website: 'https://www.ps158.org', languages: ['English', 'Spanish'], description: 'Public elementary school with strong academic programs and ESL support.', grades: 'K-5' },
  { id: 24, name: 'PS 89 Queens', type: 'primary school', borough: 'Queens', address: '44-25 Douglaston Pkwy, Queens, NY 11363', phone: '(718) 631-6890', website: 'https://www.ps89q.org', languages: ['English', 'Spanish', 'Chinese'], description: 'Elementary school serving diverse Queens families with multilingual programs.', grades: 'K-5' },
  { id: 25, name: 'PS 147 Isaac Remsen', type: 'primary school', borough: 'Brooklyn', address: '325 Bushwick Ave, Brooklyn, NY 11206', phone: '(718) 574-0750', website: 'https://www.ps147.org', languages: ['English', 'Spanish', 'Arabic'], description: 'Elementary school with strong bilingual programs serving immigrant families.', grades: 'K-5' },
  { id: 26, name: 'PS 277 Gerritsen Beach', type: 'primary school', borough: 'Brooklyn', address: '2529 Gerritsen Ave, Brooklyn, NY 11229', phone: '(718) 743-5400', website: 'https://www.ps277.org', languages: ['English', 'Spanish'], description: 'Elementary school with dedicated ESL programs for new immigrant children.', grades: 'K-5' },
  { id: 27, name: 'PS 48 William Wordsworth', type: 'primary school', borough: 'Bronx', address: '4360 Katonah Ave, Bronx, NY 10470', phone: '(718) 882-9654', website: 'https://www.ps48bronx.org', languages: ['English', 'Spanish'], description: 'Elementary school serving the Bronx with bilingual and ESL programs.', grades: 'K-5' },
];

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  university:       { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
  college:          { bg: '#e0e7ff', text: '#4338ca', border: '#6366f1' },
  'high school':    { bg: '#fef3c7', text: '#b45309', border: '#f59e0b' },
  'middle school':  { bg: '#dcfce7', text: '#15803d', border: '#22c55e' },
  'primary school': { bg: '#fce7f3', text: '#be185d', border: '#ec4899' },
};

interface SchoolsProps {
  language?: LanguageCode;
}

export default function Schools({ language = 'en' }: SchoolsProps) {
  const [selectedType, setSelectedType] = useState<SchoolType>('all');
  const [selectedBorough, setSelectedBorough] = useState<Borough>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('all');

  const types: { id: SchoolType; label: string }[] = [
    { id: 'all', label: 'All Schools' },
    { id: 'university', label: 'Universities' },
    { id: 'college', label: 'Colleges' },
    { id: 'high school', label: 'High Schools' },
    { id: 'middle school', label: 'Middle Schools' },
    { id: 'primary school', label: 'Primary Schools' },
  ];

  const boroughs: Borough[] = ['all', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'];
  const languages: Language[] = ['all', 'English', 'Spanish', 'Arabic', 'Chinese', 'French'];

  const filtered = useMemo(() => {
    return schools.filter(school => {
      const matchType = selectedType === 'all' || school.type === selectedType;
      const matchBorough = selectedBorough === 'all' || school.borough === selectedBorough;
      const matchLang = selectedLanguage === 'all' || school.languages.includes(selectedLanguage);
      return matchType && matchBorough && matchLang;
    });
  }, [selectedType, selectedBorough, selectedLanguage]);

  return (
    <section className="py-16" style={{ background: '#f0f7ff', borderTop: '1px solid #e5e7eb' }}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: '#dbeafe' }}>
            <GraduationCap className="w-8 h-8" style={{ color: '#2a9df4' }} />
          </div>
          <h2 className="text-4xl font-bold mb-3" style={{ color: '#1e293b' }}>Schools in New York</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Find universities, colleges, and schools across all five boroughs</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm" style={{ border: '1px solid #e5e7eb' }}>
          
          {/* Type filter */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">School Type</p>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: selectedType === type.id ? 600 : 400,
                    background: selectedType === type.id ? '#2a9df4' : '#f9fafb',
                    color: selectedType === type.id ? '#ffffff' : '#374151',
                    border: selectedType === type.id ? 'none' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Borough filter */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Borough</p>
            <div className="flex flex-wrap gap-2">
              {boroughs.map(borough => (
                <button
                  key={borough}
                  onClick={() => setSelectedBorough(borough)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: selectedBorough === borough ? 600 : 400,
                    background: selectedBorough === borough ? '#1e293b' : '#f9fafb',
                    color: selectedBorough === borough ? '#ffffff' : '#374151',
                    border: selectedBorough === borough ? 'none' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {borough === 'all' ? 'All Boroughs' : borough}
                </button>
              ))}
            </div>
          </div>

          {/* Language filter */}
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Language of Instruction</p>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: selectedLanguage === lang ? 600 : 400,
                    background: selectedLanguage === lang ? '#10b981' : '#f9fafb',
                    color: selectedLanguage === lang ? '#ffffff' : '#374151',
                    border: selectedLanguage === lang ? 'none' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {lang === 'all' ? 'All Languages' : lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">Showing {filtered.length} of {schools.length} schools</p>

        {/* School Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No schools found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {filtered.map(school => {
              const colors = typeColors[school.type] || typeColors['university'];
              return (
                <div key={school.id} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all" style={{ border: `1px solid #e5e7eb`, borderTop: `4px solid ${colors.border}` }}>
                  
                  {/* Type badge + borough */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full capitalize" style={{ background: colors.bg, color: colors.text }}>
                      {school.type}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{school.borough}</span>
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-gray-800 text-base mb-2">{school.name}</h3>
                  
                  {/* Grades */}
                  {school.grades && (
                    <p className="text-xs font-medium mb-2" style={{ color: colors.text }}>Grades: {school.grades}</p>
                  )}

                  {/* Description */}
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{school.description}</p>

                  {/* Details */}
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                      <span>{school.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                      <span>{school.phone}</span>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {school.languages.map(lang => (
                      <span key={lang} className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, background: colors.bg, color: colors.text, textDecoration: 'none' }}
                    >
                      <Globe className="w-4 h-4" />
                      <span>Visit Website</span>
                    </a>
                    
                      href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(school.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, background: '#f9fafb', color: '#374151', border: '1px solid #e5e7eb', textDecoration: 'none' }}
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
