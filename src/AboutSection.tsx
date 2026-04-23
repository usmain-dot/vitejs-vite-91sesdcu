import React from 'react';
import { Heart, Globe, Shield, Users, ArrowRight } from 'lucide-react';

const stats = [
  { number: '80+',  label: 'Schools Listed'         },
  { number: '85+',  label: 'Essential Services'      },
  { number: '12',   label: 'Co-Working Spaces'       },
  { number: '5',    label: 'Languages Supported'     },
];

const pillars = [
  {
    icon: Heart,
    color: '#ef4444',
    bg: '#fef2f2',
    title: 'Built for Newcomers',
    desc: 'Designed specifically for immigrants, refugees, and asylum seekers navigating New York City for the first time.',
  },
  {
    icon: Globe,
    color: '#2a9df4',
    bg: '#dbeafe',
    title: 'Multilingual',
    desc: 'Available in English, Spanish, Arabic, Hebrew, and Kiswahili — because language should never be a barrier to help.',
  },
  {
    icon: Shield,
    color: '#10b981',
    bg: '#d1fae5',
    title: 'Free & Trusted',
    desc: 'Every service listed is vetted and free to access. No ads, no paywalls — just real help for real people.',
  },
  {
    icon: Users,
    color: '#8b5cf6',
    bg: '#ede9fe',
    title: 'Community First',
    desc: 'Built by and for the communities it serves. If a service is missing, you can help us add it.',
  },
];

export default function AboutSection() {
  return (
    <section style={{ background: '#ffffff', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>

      {/* ── Hero band ── */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f4c81 100%)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '16px' }}>
            About Bridge NYC
          </span>
          <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '20px' }}>
            New York is big.<br />Finding help shouldn't be hard.
          </h2>
          <p style={{ fontSize: '17px', color: '#cbd5e1', lineHeight: '1.8', maxWidth: '620px', margin: '0 auto' }}>
            Bridge is a free platform that connects immigrants, refugees, and newcomers
            in New York City to housing, healthcare, legal aid, schools, employment,
            and more — all in one place, in your language.
          </p>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{ background: '#2a9df4', padding: '0 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '28px 16px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{s.number}</div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mission ── */}
      <div style={{ padding: '72px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2a9df4' }}>Our Mission</span>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: '12px 0 20px', lineHeight: '1.3' }}>
              One platform.<br />Every resource you need.
            </h3>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.8', marginBottom: '16px' }}>
              When you arrive in a new city, everything is unfamiliar — the language, the system, 
              the people. Critical services exist across dozens of websites, phone numbers, and offices, 
              all in English, all scattered.
            </p>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.8' }}>
              Bridge changes that. We bring housing assistance, free legal aid, healthcare clinics, 
              ESL classes, top schools, and flexible workspaces into one searchable, multilingual 
              platform — with directions, phone numbers, and appointment booking built right in.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { emoji: '🏠', text: 'Emergency shelter & transitional housing'   },
              { emoji: '⚖️', text: 'Free immigration & housing legal aid'       },
              { emoji: '🏥', text: 'Multilingual healthcare & mental health'    },
              { emoji: '🎓', text: '80+ schools across all five boroughs'       },
              { emoji: '💼', text: 'Job training, ESL & employment services'    },
              { emoji: '🖥️', text: 'Coworking spaces for entrepreneurs'        },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.emoji}</span>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Four pillars ── */}
      <div style={{ background: '#f8fafc', padding: '64px 24px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2a9df4' }}>Why Bridge</span>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginTop: '10px' }}>What makes us different</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: '22px', height: '22px', color: p.color }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>{p.title}</h4>
                    <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Who it's for ── */}
      <div style={{ padding: '64px 24px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2a9df4' }}>Who It's For</span>
        <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: '12px 0 40px' }}>Bridge is built for you if you are…</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {[
            '🛬 A recent immigrant',
            '🔒 An asylum seeker',
            '🌍 A refugee',
            '📚 Looking for schools',
            '🏠 Searching for housing',
            '⚖️ Needing legal help',
            '💊 Seeking healthcare',
            '💼 Finding work',
            '🖥️ A remote worker',
            '🗣️ Learning English',
            '👨‍👩‍👧 A family settling in NYC',
            '🚀 An immigrant entrepreneur',
          ].map((tag, i) => (
            <span key={i} style={{ display: 'inline-block', padding: '10px 18px', borderRadius: '30px', background: '#f1f5f9', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: 'linear-gradient(135deg, #2a9df4 0%, #1e40af 100%)', padding: '56px 24px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
          Know a service that should be listed?
        </h3>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>
          Bridge grows with the community. If you know of a resource that's missing, help us add it.
        </p>
        <a
          href="mailto:contact@getbridgenyc.com"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '12px', background: '#ffffff', color: '#1e40af', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
        >
          Suggest a Service <ArrowRight style={{ width: '16px', height: '16px' }} />
        </a>
      </div>

    </section>
  );
}