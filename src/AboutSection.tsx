import { useTranslation } from 'react-i18next';
import { Heart, Globe, Shield, Users, ArrowRight } from 'lucide-react';


const stats = [
  { number: '80+', labelKey: 'statsSchools'    },
  { number: '85+', labelKey: 'statsServices'   },
  { number: '12',  labelKey: 'statsCoworking'  },
  { number: '5',   labelKey: 'statsLanguages'  },
] as const;

const pillarsIcons = [
  { icon: Heart,  color: '#ef4444', bg: '#fef2f2' },
  { icon: Globe,  color: '#2a9df4', bg: '#dbeafe' },
  { icon: Shield, color: '#10b981', bg: '#d1fae5' },
  { icon: Users,  color: '#8b5cf6', bg: '#ede9fe' },
];


export default function AboutSection() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'he';

  return (
    <section dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#ffffff' }}>

      {/* ── Hero band ── */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f4c81 100%)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '16px' }}>
            {t('about.badge')}
          </span>
          <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '20px' }}>
            {t('about.headline1')}<br />{t('about.headline2')}
          </h2>
          <p style={{ fontSize: '17px', color: '#cbd5e1', lineHeight: '1.8', maxWidth: '620px', margin: '0 auto' }}>
            {t('about.intro')}
          </p>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{ background: '#2a9df4', padding: '0 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '28px 16px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.2)' : 'none' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{s.number}</div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {t(`about.${s.labelKey}`)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mission ── */}
      <div style={{ padding: '72px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2a9df4' }}>{t('about.missionBadge')}</span>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: '12px 0 20px', lineHeight: '1.3' }}>
              {t('about.missionTitle1')}<br />{t('about.missionTitle2')}
            </h3>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.8', marginBottom: '16px' }}>{t('about.missionP1')}</p>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.8' }}>{t('about.missionP2')}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(t('about.services', { returnObjects: true }) as string[]).map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.split(' ')[0]}</span>
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>{item.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Four pillars ── */}
      <div style={{ background: '#f8fafc', padding: '64px 24px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2a9df4' }}>{t('about.whyBadge')}</span>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginTop: '10px' }}> {t('about.whyTitle')}</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {(t('about.pillars', { returnObjects: true }) as { title: string; desc: string }[]).map((p, i) => {
              const { icon: Icon, color, bg } = pillarsIcons[i];
              return (
                <div key={i} style={{ background: '#ffffff', borderRadius: '16px', padding: '28px', border: '1px solid #e5e7eb', display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: '22px', height: '22px', color }} />
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
        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2a9df4' }}>{t('about.whoBadge')}</span>
        <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: '12px 0 40px' }}>{t('about.whoTitle')}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {(t('about.whoTags', { returnObjects: true }) as string[]).map((tag, i) => ( 
            <span key={i} style={{ display: 'inline-block', padding: '10px 18px', borderRadius: '30px', background: '#f1f5f9', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: 'linear-gradient(135deg, #2a9df4 0%, #1e40af 100%)', padding: '56px 24px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>{t('about.ctaTitle')}</h3>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>{t('about.ctaSubtitle')}</p>
        <a
          href="mailto:contact@getbridgenyc.com"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '12px', background: '#ffffff', color: '#1e40af', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
        >
          {t('about.ctaButton')} <ArrowRight style={{ width: '16px', height: '16px' }} />
        </a>
      </div>

    </section>
  );
}