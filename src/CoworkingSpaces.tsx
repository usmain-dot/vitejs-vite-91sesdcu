import React, { useState, useMemo } from 'react';
import { Building2, MapPin, Globe, Star } from 'lucide-react';

type Borough = 'all' | 'Manhattan' | 'Brooklyn' | 'Queens' | 'Bronx' | 'Staten Island';
type Tier = 'all' | 'enterprise' | 'premium' | 'community' | 'popular';

interface CoworkingSpace {
  id: number;
  name: string;
  tier: Tier;
  tagline: string;
  borough: Borough;
  address: string;
  website: string;
  priceRange: string;
  amenities: string[];
  description: string;
  multiLocation: boolean;
  accentColor: string;
  bgColor: string;
  textColor: string;
}

const spaces: CoworkingSpace[] = [
  { id: 1, name: 'WeWork', tier: 'enterprise', tagline: 'The largest coworking network in NYC', borough: 'Manhattan', address: 'Multiple locations across all NYC boroughs', website: 'https://www.wework.com/l/new-york-city--NY', priceRange: '$$$', amenities: ['High-Speed Wi-Fi', 'Private Offices', 'Meeting Rooms', 'Coffee & Tea', 'Events', 'Global Access'], description: "The world's largest flexible workspace provider with dozens of NYC locations spanning millions of sq ft. Offers hot desks, dedicated desks, private offices, and full floors for teams of any size.", multiLocation: true, accentColor: '#000000', bgColor: '#f5f5f5', textColor: '#111111' },
  { id: 2, name: 'Regus (IWG)', tier: 'enterprise', tagline: 'Global flexible office solutions', borough: 'Manhattan', address: 'Multiple locations across NYC', website: 'https://www.regus.com/en-us/united-states/new-york', priceRange: '$$$', amenities: ['Private Offices', 'Virtual Office', 'Meeting Rooms', 'Business Lounge', 'IT Support', 'Global Network'], description: 'Global leader in flexible workspaces with a vast NYC presence. Ideal for professionals and businesses needing scalable office solutions, virtual offices, or meeting rooms on demand.', multiLocation: true, accentColor: '#003087', bgColor: '#e8f0fb', textColor: '#003087' },
  { id: 3, name: 'Spaces (by IWG)', tier: 'enterprise', tagline: 'Creative coworking with a boutique feel', borough: 'Manhattan', address: 'Multiple Manhattan & Brooklyn locations', website: 'https://www.spacesworks.com/new-york/', priceRange: '$$$', amenities: ['Creative Design', 'Hot Desks', 'Private Offices', 'Meeting Rooms', 'Community Events', 'Café Bar'], description: "IWG's design-led coworking brand offering beautifully crafted spaces with a creative, hospitality-inspired atmosphere. Perfect for entrepreneurs, freelancers, and innovative teams.", multiLocation: true, accentColor: '#e63329', bgColor: '#fdecea', textColor: '#c0271e' },
  { id: 4, name: 'Knotel', tier: 'enterprise', tagline: 'Flexible office solutions for enterprises', borough: 'Manhattan', address: 'Midtown & Downtown Manhattan', website: 'https://www.knotel.com', priceRange: '$$$$', amenities: ['Custom Buildouts', 'Full Floors', 'Dedicated IT', 'On-Demand Scaling', 'Premium Amenities', 'Branding Options'], description: 'Enterprise-focused flexible office provider specializing in fully customized, branded spaces for growing companies. Ideal for teams needing large-scale, turn-key office environments.', multiLocation: true, accentColor: '#1a1a2e', bgColor: '#eeeef5', textColor: '#1a1a2e' },
  { id: 5, name: 'Industrious', tier: 'premium', tagline: 'Hospitality-style premium coworking', borough: 'Manhattan', address: 'Multiple Manhattan locations (Midtown, FiDi, Flatiron)', website: 'https://www.industriousoffice.com/cities/new-york-city', priceRange: '$$$$', amenities: ['Concierge Service', 'Premium Coffee', 'Wellness Rooms', 'Phone Booths', 'Printing', 'Stocked Kitchens'], description: 'Premium coworking known for hotel-quality service and beautifully designed offices. Offers private suites, dedicated desks, and day passes. A top choice for professionals who value comfort and service.', multiLocation: true, accentColor: '#2d6a4f', bgColor: '#d8f3dc', textColor: '#1b4332' },
  { id: 6, name: 'The Yard', tier: 'community', tagline: 'NYC-born coworking with community at its core', borough: 'Manhattan', address: 'Manhattan, Brooklyn & Hoboken locations', website: 'https://theyard.com', priceRange: '$$', amenities: ['Hot Desks', 'Private Offices', 'Rooftop Access', 'Community Events', 'Dog Friendly', 'Meeting Rooms'], description: 'Homegrown NYC coworking brand with a strong community focus. Known for its welcoming atmosphere, member events, and thoughtfully designed spaces across Manhattan and Brooklyn.', multiLocation: true, accentColor: '#f4a261', bgColor: '#fff3e0', textColor: '#b5541a' },
  { id: 7, name: 'Bond Collective', tier: 'community', tagline: 'Modern design meets creative community', borough: 'Manhattan', address: 'Manhattan (Flatiron, Tribeca) & Brooklyn (Gowanus, Bushwick)', website: 'https://www.bondcollective.com', priceRange: '$$', amenities: ['Artisan Coffee', 'High-Speed Wi-Fi', 'Phone Booths', 'Printing', 'Lounge Areas', 'Event Space'], description: 'Boutique coworking with stunning interior design spanning Manhattan and Brooklyn. Popular among creatives, startups, and freelancers who want inspiring spaces without the enterprise price tag.', multiLocation: true, accentColor: '#6c63ff', bgColor: '#ede9fe', textColor: '#4c1d95' },
  { id: 8, name: 'The Farm SoHo NYC', tier: 'popular', tagline: 'Coworking & private offices in the heart of SoHo', borough: 'Manhattan', address: '447 Broadway, 2nd Floor, New York, NY 10013', website: 'https://thefarmsohonyc.com', priceRange: '$$', amenities: ['Private Offices', 'Hot Desks', 'Podcast Studio', 'Phone Booths', 'High-Speed Wi-Fi', 'Printing'], description: 'A highly rated SoHo coworking space offering flexible memberships, private offices, and lease options. Loved for its accessible pricing, central location, and strong community vibe.', multiLocation: false, accentColor: '#52b788', bgColor: '#d8f3dc', textColor: '#1b4332' },
  { id: 9, name: 'Rise New York', tier: 'popular', tagline: 'Fintech & innovation hub in the heart of NYC', borough: 'Manhattan', address: '43 W 23rd St, New York, NY 10010', website: 'https://www.rise.barclays/new-york', priceRange: '$$', amenities: ['Event Space', 'Mentorship Programs', 'Demo Kitchen', 'Meeting Rooms', 'Wi-Fi', 'Networking Events'], description: 'Barclays-backed innovation hub focused on fintech startups. Offers workspace, events, and access to a global network of mentors and investors. Ideal for early-stage fintech and tech companies.', multiLocation: false, accentColor: '#00aeef', bgColor: '#e0f7ff', textColor: '#006fa6' },
  { id: 10, name: 'The Commons', tier: 'popular', tagline: 'Community-first coworking in Brooklyn', borough: 'Brooklyn', address: '388 Atlantic Ave, Brooklyn, NY 11217', website: 'https://thecommons.nyc', priceRange: '$$', amenities: ['Hot Desks', 'Dedicated Desks', 'Meeting Rooms', 'Natural Light', 'Community Events', 'Café'], description: 'A Brooklyn-based coworking community known for its relaxed, inclusive atmosphere. Perfect for remote workers, freelancers, and small teams who want a neighborhood feel over a corporate one.', multiLocation: false, accentColor: '#e76f51', bgColor: '#fde8e0', textColor: '#9d3a1e' },
  { id: 11, name: 'OS NYC', tier: 'popular', tagline: 'Open-source workspace for creatives & entrepreneurs', borough: 'Manhattan', address: '594 Broadway, New York, NY 10012', website: 'https://www.osnyc.com', priceRange: '$$', amenities: ['Hot Desks', 'Private Suites', 'Podcast Studio', 'Photo Studio', 'Wellness Room', 'Rooftop'], description: 'A creative workspace in SoHo combining coworking with studio space for photographers, podcasters, and content creators. Unique amenity mix makes it a standout for media and creative professionals.', multiLocation: false, accentColor: '#023e8a', bgColor: '#e0eeff', textColor: '#023e8a' },
  { id: 12, name: 'NYC Office Suites', tier: 'popular', tagline: 'Executive suites & virtual offices since 1992', borough: 'Manhattan', address: '1180 Avenue of the Americas, New York, NY 10036', website: 'https://www.nycofficesuites.com', priceRange: '$$$', amenities: ['Executive Suites', 'Virtual Office', 'Conference Rooms', 'Receptionist', 'Mail Handling', 'IT Support'], description: "One of NYC's most established executive suite providers with prime Midtown addresses. A trusted choice for businesses wanting a professional NYC presence with full-service support.", multiLocation: true, accentColor: '#344e41', bgColor: '#e9f5ee', textColor: '#1f3a2a' },
];

const tierConfig: Record<Tier, { label: string; color: string }> = {
  all:        { label: 'All',          color: '#374151' },
  enterprise: { label: 'Enterprise',   color: '#1e40af' },
  premium:    { label: 'Premium',      color: '#065f46' },
  community:  { label: 'Community',    color: '#92400e' },
  popular:    { label: 'Popular Pick', color: '#6d28d9' },
};

const priceLabel: Record<string, string> = {
  '$': 'Budget-friendly', '$$': 'Moderate', '$$$': 'Premium', '$$$$': 'Enterprise',
};

export default function CoworkingSpaces() {
  const [selectedTier,    setSelectedTier]    = useState<Tier>('all');
  const [selectedBorough, setSelectedBorough] = useState<Borough>('all');
  const [hasInteracted,   setHasInteracted]   = useState(false);

  const tiers:    Tier[]    = ['all', 'enterprise', 'premium', 'community', 'popular'];
  const boroughs: Borough[] = ['all', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'];

  const filtered = useMemo(() => {
    if (!hasInteracted) return [];
    return spaces.filter(s => {
      const matchTier    = selectedTier    === 'all' || s.tier    === selectedTier;
      const matchBorough = selectedBorough === 'all' || s.borough === selectedBorough;
      return matchTier && matchBorough;
    });
  }, [selectedTier, selectedBorough, hasInteracted]);

  // ── Same pill style as the fixed category buttons in App.tsx ──
  const btnStyle = (active: boolean, activeColor: string) => ({
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    gap: '6px',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: active ? 600 : 500,
    background: active ? activeColor : 'rgba(255,255,255,0.9)',
    color: active ? '#ffffff' : '#374151',
    border: active ? `2px solid ${activeColor}` : '1px solid #d1d5db',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  });

  return (
    <section className="py-16" style={{ background: '#fafafa', borderTop: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: '#e0e7ff' }}>
            <Building2 className="w-8 h-8" style={{ color: '#4f46e5' }} />
          </div>
          <h2 className="text-4xl font-bold mb-3" style={{ color: '#1e293b' }}>Co-Working Spaces in New York</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Find flexible workspaces — from hot desks to private offices — across NYC's five boroughs
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm" style={{ border: '1px solid #e5e7eb' }}>
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Space Type</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {tiers.map(tier => {
                const cfg = tierConfig[tier];
                return (
                  <button key={tier} onClick={() => { setHasInteracted(true); setSelectedTier(tier); }} style={btnStyle(selectedTier === tier, cfg.color)}>
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Borough</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {boroughs.map(borough => (
                <button key={borough} onClick={() => { setHasInteracted(true); setSelectedBorough(borough); }} style={btnStyle(selectedBorough === borough, '#1e293b')}>
                  {borough === 'all' ? 'All Boroughs' : borough}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">Showing {filtered.length} of {spaces.length} spaces</p>

        {/* Grid */}
        {!hasInteracted ? (
          <div className="text-center py-16">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏢</div>
            <p className="text-gray-500 text-lg font-medium">Select a space type to explore</p>
            <p className="text-gray-400 text-sm mt-2">Enterpri
              se, premium, community and more</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No spaces found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {filtered.map(space => {
              const tierCfg = tierConfig[space.tier];
              return (
                <div key={space.id} className="bg-white rounded-xl hover:shadow-lg transition-all" style={{ border: '1px solid #e5e7eb', borderTop: `4px solid ${space.accentColor}` }}>
                  <div className="p-6">

                    {/* Tier badge + price */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: tierCfg.color, color: '#ffffff' }}>
                        {tierCfg.label}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: space.bgColor, color: space.textColor }} title={priceLabel[space.priceRange]}>
                        {space.priceRange}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{space.name}</h3>

                    {/* Tagline */}
                    <p style={{ fontSize: '12px', fontWeight: 500, color: space.accentColor, marginBottom: '10px' }}>{space.tagline}</p>

                    {/* Description */}
                    <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '14px' }}>{space.description}</p>

                    {/* Address */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '8px' }}>
                      <MapPin style={{ width: '14px', height: '14px', color: '#9ca3af', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '13px', color: '#4b5563' }}>{space.address}</span>
                    </div>

                    {/* Multi-location */}
                    {space.multiLocation && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '14px' }}>
                        <Star style={{ width: '13px', height: '13px', color: space.accentColor, flexShrink: 0 }} />
                        <span style={{ fontSize: '12px', fontWeight: 500, color: space.accentColor }}>Multiple NYC locations available</span>
                      </div>
                    )}

                    {/* Amenity chips */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                      {space.amenities.map(amenity => (
                        <span key={amenity} style={{ fontSize: '11px', fontWeight: 500, padding: '4px 10px', borderRadius: '20px', background: space.bgColor, color: space.textColor, border: `1px solid ${space.accentColor}30`, whiteSpace: 'nowrap', lineHeight: '1.4' }}>
                          {amenity}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a href={space.website} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, background: space.accentColor, color: '#ffffff', textDecoration: 'none' }}>
                        <Globe style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                        <span>View Locations</span>
                      </a>
                      {!space.multiLocation && (
                        <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(space.address)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '9px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, background: '#f9fafb', color: '#374151', border: '1px solid #e5e7eb', textDecoration: 'none' }}>
                          <MapPin style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                          <span>Directions</span>
                        </a>
                      )}
                    </div>

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