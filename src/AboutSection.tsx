import React from 'react';
import { Heart, Globe, Shield, Users, ArrowRight } from 'lucide-react';

type LanguageCode = 'en' | 'es' | 'ar' | 'he' | 'sw';

interface AboutTranslation {
  badge: string;
  headline1: string;
  headline2: string;
  intro: string;
  missionBadge: string;
  missionTitle1: string;
  missionTitle2: string;
  missionP1: string;
  missionP2: string;
  whyBadge: string;
  whyTitle: string;
  whoTitle: string;
  whoBadge: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  statsSchools: string;
  statsServices: string;
  statsCoworking: string;
  statsLanguages: string;
  pillars: { title: string; desc: string }[];
  services: string[];
  whoTags: string[];
}

const translations: Record<LanguageCode, AboutTranslation> = {
  en: {
    badge: 'About Bridge NYC',
    headline1: 'New York is big.',
    headline2: 'Finding help shouldn\'t be hard.',
    intro: 'Bridge is a free platform that connects immigrants, refugees, and newcomers in New York City to housing, healthcare, legal aid, schools, employment, and more — all in one place, in your language.',
    missionBadge: 'Our Mission',
    missionTitle1: 'One platform.',
    missionTitle2: 'Every resource you need.',
    missionP1: 'When you arrive in a new city, everything is unfamiliar — the language, the system, the people. Critical services exist across dozens of websites, phone numbers, and offices, all in English, all scattered.',
    missionP2: 'Bridge changes that. We bring housing assistance, free legal aid, healthcare clinics, ESL classes, top schools, and flexible workspaces into one searchable, multilingual platform — with directions, phone numbers, and appointment booking built right in.',
    whyBadge: 'Why Bridge',
    whyTitle: 'What makes us different',
    whoBadge: 'Who It\'s For',
    whoTitle: 'Bridge is built for you if you are…',
    ctaTitle: 'Know a service that should be listed?',
    ctaSubtitle: 'Bridge grows with the community. If you know of a resource that\'s missing, help us add it.',
    ctaButton: 'Suggest a Service',
    statsSchools: 'Schools Listed',
    statsServices: 'Essential Services',
    statsCoworking: 'Co-Working Spaces',
    statsLanguages: 'Languages Supported',
    pillars: [
      { title: 'Built for Newcomers', desc: 'Designed specifically for immigrants, refugees, and asylum seekers navigating New York City for the first time.' },
      { title: 'Multilingual', desc: 'Available in English, Spanish, Arabic, Hebrew, and Kiswahili — because language should never be a barrier to help.' },
      { title: 'Free & Trusted', desc: 'Every service listed is vetted and free to access. No ads, no paywalls — just real help for real people.' },
      { title: 'Community First', desc: 'Built by and for the communities it serves. If a service is missing, you can help us add it.' },
    ],
    services: [
      '🏠 Emergency shelter & transitional housing',
      '⚖️ Free immigration & housing legal aid',
      '🏥 Multilingual healthcare & mental health',
      '🎓 80+ schools across all five boroughs',
      '💼 Job training, ESL & employment services',
      '🖥️ Coworking spaces for entrepreneurs',
    ],
    whoTags: [
      '🛬 A recent immigrant', '🔒 An asylum seeker', '🌍 A refugee',
      '📚 Looking for schools', '🏠 Searching for housing', '⚖️ Needing legal help',
      '💊 Seeking healthcare', '💼 Finding work', '🖥️ A remote worker',
      '🗣️ Learning English', '👨‍👩‍👧 A family settling in NYC', '🚀 An immigrant entrepreneur',
    ],
  },

  es: {
    badge: 'Sobre Bridge NYC',
    headline1: 'Nueva York es grande.',
    headline2: 'Encontrar ayuda no debería ser difícil.',
    intro: 'Bridge es una plataforma gratuita que conecta a inmigrantes, refugiados y recién llegados en la ciudad de Nueva York con vivienda, atención médica, ayuda legal, escuelas, empleo y más — todo en un solo lugar, en tu idioma.',
    missionBadge: 'Nuestra Misión',
    missionTitle1: 'Una plataforma.',
    missionTitle2: 'Todos los recursos que necesitas.',
    missionP1: 'Cuando llegas a una nueva ciudad, todo es desconocido — el idioma, el sistema, las personas. Los servicios críticos están dispersos en decenas de sitios web, números de teléfono y oficinas, todos en inglés.',
    missionP2: 'Bridge cambia eso. Reunimos asistencia de vivienda, ayuda legal gratuita, clínicas de salud, clases de inglés, las mejores escuelas y espacios de trabajo flexibles en una plataforma multilingüe con direcciones, teléfonos y reserva de citas integrados.',
    whyBadge: 'Por qué Bridge',
    whyTitle: 'Lo que nos hace diferentes',
    whoBadge: 'Para quién es',
    whoTitle: 'Bridge está hecho para ti si eres…',
    ctaTitle: '¿Conoces un servicio que debería estar listado?',
    ctaSubtitle: 'Bridge crece con la comunidad. Si conoces un recurso que falta, ayúdanos a agregarlo.',
    ctaButton: 'Sugerir un Servicio',
    statsSchools: 'Escuelas Listadas',
    statsServices: 'Servicios Esenciales',
    statsCoworking: 'Espacios de Coworking',
    statsLanguages: 'Idiomas Soportados',
    pillars: [
      { title: 'Hecho para Recién Llegados', desc: 'Diseñado específicamente para inmigrantes, refugiados y solicitantes de asilo que navegan Nueva York por primera vez.' },
      { title: 'Multilingüe', desc: 'Disponible en inglés, español, árabe, hebreo y kiswahili — porque el idioma nunca debe ser una barrera para obtener ayuda.' },
      { title: 'Gratis y Confiable', desc: 'Cada servicio listado es verificado y gratuito. Sin anuncios, sin muros de pago — solo ayuda real para personas reales.' },
      { title: 'La Comunidad Primero', desc: 'Construido por y para las comunidades a las que sirve. Si falta un servicio, puedes ayudarnos a agregarlo.' },
    ],
    services: [
      '🏠 Refugio de emergencia y vivienda transitoria',
      '⚖️ Ayuda legal gratuita de inmigración y vivienda',
      '🏥 Atención médica multilingüe y salud mental',
      '🎓 Más de 80 escuelas en los cinco condados',
      '💼 Capacitación laboral, inglés y empleo',
      '🖥️ Espacios de coworking para emprendedores',
    ],
    whoTags: [
      '🛬 Inmigrante reciente', '🔒 Solicitante de asilo', '🌍 Refugiado',
      '📚 Buscando escuelas', '🏠 Buscando vivienda', '⚖️ Necesitando ayuda legal',
      '💊 Buscando atención médica', '💼 Buscando trabajo', '🖥️ Trabajador remoto',
      '🗣️ Aprendiendo inglés', '👨‍👩‍👧 Familia asentándose en NYC', '🚀 Emprendedor inmigrante',
    ],
  },

  ar: {
    badge: 'عن Bridge NYC',
    headline1: 'نيويورك مدينة كبيرة.',
    headline2: 'إيجاد المساعدة لا ينبغي أن يكون صعباً.',
    intro: 'Bridge منصة مجانية تربط المهاجرين واللاجئين والقادمين الجدد في مدينة نيويورك بالسكن والرعاية الصحية والمساعدة القانونية والمدارس والتوظيف والمزيد — كل ذلك في مكان واحد، بلغتك.',
    missionBadge: 'مهمتنا',
    missionTitle1: 'منصة واحدة.',
    missionTitle2: 'كل الموارد التي تحتاجها.',
    missionP1: 'عندما تصل إلى مدينة جديدة، كل شيء غير مألوف — اللغة والنظام والناس. الخدمات الأساسية موزعة على عشرات المواقع وأرقام الهواتف والمكاتب، جميعها بالإنجليزية.',
    missionP2: 'Bridge يغير ذلك. نجمع مساعدة السكن والمساعدة القانونية المجانية وعيادات الرعاية الصحية وفصول اللغة الإنجليزية وأفضل المدارس ومساحات العمل المرنة في منصة متعددة اللغات مع الاتجاهات وأرقام الهواتف وحجز المواعيد.',
    whyBadge: 'لماذا Bridge',
    whyTitle: 'ما يميزنا',
    whoBadge: 'لمن هو',
    whoTitle: 'Bridge مصنوع لك إذا كنت…',
    ctaTitle: 'هل تعرف خدمة يجب إدراجها؟',
    ctaSubtitle: 'Bridge ينمو مع المجتمع. إذا كنت تعرف موردًا مفقودًا، ساعدنا في إضافته.',
    ctaButton: 'اقتراح خدمة',
    statsSchools: 'المدارس المدرجة',
    statsServices: 'الخدمات الأساسية',
    statsCoworking: 'مساحات العمل المشترك',
    statsLanguages: 'اللغات المدعومة',
    pillars: [
      { title: 'مبني للقادمين الجدد', desc: 'مصمم خصيصاً للمهاجرين واللاجئين وطالبي اللجوء الذين يتنقلون في نيويورك لأول مرة.' },
      { title: 'متعدد اللغات', desc: 'متاح بالإنجليزية والإسبانية والعربية والعبرية والكيسواحيلي — لأن اللغة لا ينبغي أن تكون عائقاً للحصول على المساعدة.' },
      { title: 'مجاني وموثوق', desc: 'كل خدمة مدرجة يتم التحقق منها ومجانية. لا إعلانات، لا جدران دفع — فقط مساعدة حقيقية لأشخاص حقيقيين.' },
      { title: 'المجتمع أولاً', desc: 'مبني من قِبل المجتمعات التي يخدمها ولها. إذا كانت هناك خدمة مفقودة، يمكنك مساعدتنا في إضافتها.' },
    ],
    services: [
      '🏠 مأوى طارئ وإسكان انتقالي',
      '⚖️ مساعدة قانونية مجانية للهجرة والسكن',
      '🏥 رعاية صحية متعددة اللغات وصحة نفسية',
      '🎓 أكثر من 80 مدرسة في جميع الأحياء الخمسة',
      '💼 تدريب مهني وإنجليزية وخدمات التوظيف',
      '🖥️ مساحات عمل مشترك للمقاولين',
    ],
    whoTags: [
      '🛬 مهاجر حديث', '🔒 طالب لجوء', '🌍 لاجئ',
      '📚 يبحث عن مدارس', '🏠 يبحث عن سكن', '⚖️ يحتاج مساعدة قانونية',
      '💊 يبحث عن رعاية صحية', '💼 يبحث عن عمل', '🖥️ عامل عن بُعد',
      '🗣️ يتعلم الإنجليزية', '👨‍👩‍👧 عائلة تستقر في NYC', '🚀 رائد أعمال مهاجر',
    ],
  },

  he: {
    badge: 'אודות Bridge NYC',
    headline1: 'ניו יורק גדולה.',
    headline2: 'למצוא עזרה לא אמור להיות קשה.',
    intro: 'Bridge היא פלטפורמה חינמית המחברת מהגרים, פליטים ועולים חדשים בניו יורק לדיור, שירותי בריאות, סיוע משפטי, בתי ספר, תעסוקה ועוד — הכל במקום אחד, בשפתך.',
    missionBadge: 'המשימה שלנו',
    missionTitle1: 'פלטפורמה אחת.',
    missionTitle2: 'כל המשאבים שאתה צריך.',
    missionP1: 'כשאתה מגיע לעיר חדשה, הכל לא מוכר — השפה, המערכת, האנשים. שירותים חיוניים מפוזרים על פני עשרות אתרים, מספרי טלפון ומשרדים, הכל באנגלית.',
    missionP2: 'Bridge משנה את זה. אנחנו מביאים סיוע דיור, ייעוץ משפטי חינם, מרפאות, שיעורי אנגלית, בתי ספר מובחרים ומרחבי עבודה גמישים לפלטפורמה רב-לשונית אחת עם הוראות, מספרי טלפון וקביעת פגישות.',
    whyBadge: 'למה Bridge',
    whyTitle: 'מה מייחד אותנו',
    whoBadge: 'למי זה מיועד',
    whoTitle: 'Bridge נבנה בשבילך אם אתה…',
    ctaTitle: 'מכיר שירות שצריך להיות ברשימה?',
    ctaSubtitle: 'Bridge גדל עם הקהילה. אם אתה מכיר משאב חסר, עזור לנו להוסיף אותו.',
    ctaButton: 'הצע שירות',
    statsSchools: 'בתי ספר ברשימה',
    statsServices: 'שירותים חיוניים',
    statsCoworking: 'מרחבי עבודה משותפת',
    statsLanguages: 'שפות נתמכות',
    pillars: [
      { title: 'נבנה לעולים חדשים', desc: 'מתוכנן במיוחד למהגרים, פליטים ומבקשי מקלט המנווטים בניו יורק לראשונה.' },
      { title: 'רב-לשוני', desc: 'זמין באנגלית, ספרדית, ערבית, עברית וקיסוואהילי — כי שפה לעולם לא אמורה להיות מחסום לעזרה.' },
      { title: 'חינמי ואמין', desc: 'כל שירות ברשימה נבדק וחינמי. ללא פרסומות, ללא חסמי תשלום — רק עזרה אמיתית לאנשים אמיתיים.' },
      { title: 'הקהילה קודמת', desc: 'נבנה על ידי הקהילות שהוא משרת ולמענן. אם חסר שירות, אתה יכול לעזור לנו להוסיף אותו.' },
    ],
    services: [
      '🏠 מקלט חירום ודיור מעברי',
      '⚖️ סיוע משפטי חינם להגירה ודיור',
      '🏥 שירותי בריאות רב-לשוניים ובריאות נפש',
      '🎓 80+ בתי ספר בכל חמשת הרובעים',
      '💼 הכשרה מקצועית, אנגלית ושירותי תעסוקה',
      '🖥️ מרחבי עבודה משותפת ליזמים',
    ],
    whoTags: [
      '🛬 מהגר חדש', '🔒 מבקש מקלט', '🌍 פליט',
      '📚 מחפש בתי ספר', '🏠 מחפש דיור', '⚖️ זקוק לעזרה משפטית',
      '💊 מחפש שירותי בריאות', '💼 מחפש עבודה', '🖥️ עובד מרחוק',
      '🗣️ לומד אנגלית', '👨‍👩‍👧 משפחה מתיישבת ב-NYC', '🚀 יזם מהגר',
    ],
  },

  sw: {
    badge: 'Kuhusu Bridge NYC',
    headline1: 'New York ni kubwa.',
    headline2: 'Kupata msaada haipaswi kuwa ngumu.',
    intro: 'Bridge ni jukwaa la bure linaloounganisha wahamiaji, wakimbizi, na wapya wanaofika New York City na makazi, huduma za afya, msaada wa kisheria, shule, ajira na zaidi — yote mahali pamoja, kwa lugha yako.',
    missionBadge: 'Dhamira Yetu',
    missionTitle1: 'Jukwaa moja.',
    missionTitle2: 'Rasilimali zote unazohitaji.',
    missionP1: 'Unapofika katika jiji jipya, kila kitu ni kigeni — lugha, mfumo, watu. Huduma muhimu zipo katika makumi ya tovuti, nambari za simu na ofisi, zote kwa Kiingereza.',
    missionP2: 'Bridge inabadilisha hilo. Tunaleta msaada wa makazi, msaada wa kisheria wa bure, kliniki za afya, madarasa ya Kiingereza, shule bora na maeneo ya kufanyia kazi katika jukwaa moja la lugha nyingi na maelekezo, nambari za simu na uandikishaji wa miadi.',
    whyBadge: 'Kwa Nini Bridge',
    whyTitle: 'Kinachotufanya tofauti',
    whoBadge: 'Ni Kwa Nani',
    whoTitle: 'Bridge imejengwa kwa ajili yako kama wewe ni…',
    ctaTitle: 'Unajua huduma ambayo inapaswa kuorodheshwa?',
    ctaSubtitle: 'Bridge inakua na jamii. Kama unajua rasilimali inayokosekana, tusaidie kuiongeza.',
    ctaButton: 'Pendekeza Huduma',
    statsSchools: 'Shule Zilizoorodheshwa',
    statsServices: 'Huduma Muhimu',
    statsCoworking: 'Nafasi za Kufanyia Kazi',
    statsLanguages: 'Lugha Zinazoungwa Mkono',
    pillars: [
      { title: 'Imejengwa kwa Wapya', desc: 'Imeundwa hasa kwa wahamiaji, wakimbizi na watafuta hifadhi wanaopitia New York City kwa mara ya kwanza.' },
      { title: 'Lugha Nyingi', desc: 'Inapatikana kwa Kiingereza, Kihispania, Kiarabu, Kiebrania na Kiswahili — kwa sababu lugha kamwe haipaswi kuwa kikwazo cha kupata msaada.' },
      { title: 'Bure na Kuaminika', desc: 'Kila huduma iliyoorodheshwa imekaguliwa na ni bure. Hakuna matangazo, hakuna vizuizi vya malipo — msaada wa kweli kwa watu wa kweli.' },
      { title: 'Jamii Kwanza', desc: 'Imejengwa na jamii inazohudumia na kwa ajili yake. Kama huduma inakosekana, unaweza kutusaidia kuiongeza.' },
    ],
    services: [
      '🏠 Makazi ya dharura na ya mpito',
      '⚖️ Msaada wa kisheria wa bure wa uhamiaji na makazi',
      '🏥 Huduma za afya za lugha nyingi na afya ya akili',
      '🎓 Shule 80+ katika wilaya zote tano',
      '💼 Mafunzo ya kazi, Kiingereza na huduma za ajira',
      '🖥️ Nafasi za kufanyia kazi kwa wajasiriamali',
    ],
    whoTags: [
      '🛬 Mhamiaji mpya', '🔒 Mtafuta hifadhi', '🌍 Mkimbizi',
      '📚 Anatafuta shule', '🏠 Anatafuta makazi', '⚖️ Anahitaji msaada wa kisheria',
      '💊 Anatafuta huduma za afya', '💼 Anatafuta kazi', '🖥️ Mfanyakazi wa mbali',
      '🗣️ Anajifunza Kiingereza', '👨‍👩‍👧 Familia inayotulia NYC', '🚀 Mjasiriamali mhamiaji',
    ],
  },
};

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

interface AboutSectionProps {
  language?: LanguageCode;
}

export default function AboutSection({ language = 'en' }: AboutSectionProps) {
  const t = translations[language];
  const isRTL = language === 'ar' || language === 'he';

  return (
    <section dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#ffffff' }}>

      {/* ── Hero band ── */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f4c81 100%)', padding: '72px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#93c5fd', marginBottom: '16px' }}>
            {t.badge}
          </span>
          <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '20px' }}>
            {t.headline1}<br />{t.headline2}
          </h2>
          <p style={{ fontSize: '17px', color: '#cbd5e1', lineHeight: '1.8', maxWidth: '620px', margin: '0 auto' }}>
            {t.intro}
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
                {t[s.labelKey]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mission ── */}
      <div style={{ padding: '72px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2a9df4' }}>{t.missionBadge}</span>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: '12px 0 20px', lineHeight: '1.3' }}>
              {t.missionTitle1}<br />{t.missionTitle2}
            </h3>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.8', marginBottom: '16px' }}>{t.missionP1}</p>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.8' }}>{t.missionP2}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {t.services.map((item, i) => (
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
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2a9df4' }}>{t.whyBadge}</span>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', marginTop: '10px' }}>{t.whyTitle}</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {t.pillars.map((p, i) => {
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
        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#2a9df4' }}>{t.whoBadge}</span>
        <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', margin: '12px 0 40px' }}>{t.whoTitle}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
          {t.whoTags.map((tag, i) => (
            <span key={i} style={{ display: 'inline-block', padding: '10px 18px', borderRadius: '30px', background: '#f1f5f9', border: '1px solid #e2e8f0', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: 'linear-gradient(135deg, #2a9df4 0%, #1e40af 100%)', padding: '56px 24px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '26px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>{t.ctaTitle}</h3>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>{t.ctaSubtitle}</p>
        <a
          href="mailto:contact@getbridgenyc.com"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', borderRadius: '12px', background: '#ffffff', color: '#1e40af', fontSize: '15px', fontWeight: 700, textDecoration: 'none' }}
        >
          {t.ctaButton} <ArrowRight style={{ width: '16px', height: '16px' }} />
        </a>
      </div>

    </section>
  );
}