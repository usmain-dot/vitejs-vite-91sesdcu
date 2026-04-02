// All 73 services with translations
const translations = [
  {
    name: " Bowery Residents' Committee (BRC)",  // Added space at beginning
    description_es: "Alcance en la calle, refugio de emergencia, vivienda de transición y vivienda de apoyo permanente para neoyorquinos sin hogar.",
    description_ar: "التواصل في الشوارع، مأوى الطوارئ، السكن الانتقالي، والسكن الداعم الدائم لسكان نيويورك بلا مأوى.",
    description_he: "הסברה ברחוב, מקלט חירום, דיור מעבר ודיור תומך קבוע לתושבי ניו יורק חסרי בית.",
    description_sw: "Utoaji msaada mtaani, makazi ya dharura, makazi ya mpito, na makazi ya kudumu yanayosaidia wakazi wa New York wasio na makazi."
  },
  {
    name: " Bronx Health REACH",  // Added space
    description_es: "Programas de salud comunitaria centrados en la prevención de diabetes, salud cardiovascular y manejo de enfermedades crónicas para residentes desatendidos del Bronx.",
    description_ar: "برامج الصحة المجتمعية التي تركز على الوقاية من مرض السكري، صحة القلب والأوعية الدموية، وإدارة الأمراض المزمنة لسكان برونكس المحرومين من الخدمات.",
    description_he: "תוכניות בריאות קהילתיות המתמקדות במניעת סוכרת, בריאות לב וכלי דם וניהול מחלות כרוניות עבור תושבי ברונקס מוחלשים.",
    description_sw: "Programu za afya ya jamii zinazozingatia kuzuia ugonjwa wa kisukari, afya ya moyo na mishipa, na usimamizi wa magonjwa sugu kwa wakazi wa Bronx wanaopuuzwa."
  },
  {
    name: " Chinese-American Planning Council - Adult Education",  // Added space
    description_es: "Clases de ESL, preparación para ciudadanía, alfabetización informática y capacitación laboral para comunidades de inmigrantes chinos y asiáticos.",
    description_ar: "دروس اللغة الإنجليزية كلغة ثانية، التحضير للمواطنة، محو الأمية الحاسوبية، والتدريب المهني لمجتمعات المهاجرين الصينيين والآسيويين.",
    description_he: "שיעורי אנגלית כשפה שנייה, הכנה לאזרחות, אוריינות מחשב והכשרה מקצועית עבור קהילות מהגרים סיניות ואסייתיות.",
    description_sw: "Madarasa ya Kiingereza kama lugha ya pili, maandalizi ya uraia, ujuzi wa kompyuta, na mafunzo ya ajira kwa jamii za wahamiaji wa Kichina na Kiasia."
  },
  {
    name: " Community Healthcare Network",  // Added space
    description_es: "Atención primaria, dental, salud mental y servicios de VIH/SIDA. Acepta la mayoría de seguros incluyendo Medicaid y ofrece escala de tarifas móvil.",
    description_ar: "الرعاية الأولية، طب الأسنان، الصحة السلوكية، وخدمات فيروس نقص المناعة/الإيدز. يقبل معظم أنواع التأمين بما في ذلك Medicaid ويقدم رسوماً متدرجة.",
    description_he: "טיפול ראשוני, שיניים, בריאות נפש ושירותי HIV/AIDS. מקבל את רוב סוגי הביטוח כולל Medicaid ומציע סולם תשלום מותאם.",
    description_sw: "Huduma za msingi, meno, afya ya kiakili, na huduma za VVU/UKIMWI. Inakubali aina nyingi za bima ikiwa ni pamoja na Medicaid na inatoa bei inayotegemea kipato."
  },
  {
    name: " Goodwill NYNJ - Career Services",  // Added space
    description_es: "Capacitación laboral gratuita, asistencia con currículums, preparación para entrevistas y asesoramiento profesional. Disponible capacitación en habilidades informáticas y apoyo para colocación laboral.",
    description_ar: "تدريب وظيفي مجاني، مساعدة في السيرة الذاتية، التحضير للمقابلات، والاستشارات المهنية. متوفر التدريب على مهارات الحاسوب ودعم التوظيف.",
    description_he: "הכשרה מקצועית חינמית, סיוע בכתיבת קורות חיים, הכנה לראיונות וייעוץ קריירה. זמינה הכשרה במיומנויות מחשב ותמיכה בהשמה בעבודה.",
    description_sw: "Mafunzo ya kazi bila malipo, msaada wa wasifu, maandalizi ya mahojiano, na ushauri wa kazi. Mafunzo ya ujuzi wa kompyuta na msaada wa kupata ajira yanapatikana."
  },
  {
    name: " LaGuardia Community College - Adult Career Counseling",  // Added space
    description_es: "Asesoramiento profesional, capacitación vocacional, colocación laboral y programas de educación continua para adultos que buscan avanzar en su carrera.",
    description_ar: "الاستشارات المهنية، التدريب المهني، التوظيف، وبرامج التعليم المستمر للبالغين الذين يسعون للتقدم الوظيفي.",
    description_he: "ייעוץ קריירה, הכשרה מקצועית, השמה בעבודה ותוכניות השכלה מתמשכת למבוגרים המחפשים התקדמות בקריירה.",
    description_sw: "Ushauri wa kazi, mafunzo ya kitaaluma, upatikanaji wa ajira, na programu za elimu endelevu kwa watu wazima wanaotafuta maendeleo ya kazi."
  },
  {
    name: " Make the Road New York",  // Added space
    description_es: "Servicios legales de inmigración, talleres de conozca sus derechos, renovaciones DACA y defensa contra deportación para comunidades inmigrantes de clase trabajadora.",
    description_ar: "خدمات قانونية للهجرة، ورش عمل حول حقوقك، تجديدات DACA، والدفاع ضد الترحيل لمجتمعات المهاجرين من الطبقة العاملة.",
    description_he: "שירותים משפטיים להגירה, סדנאות זכויות, חידושי DACA והגנה מפני גירוש עבור קהילות מהגרים ממעמד הפועלים.",
    description_sw: "Huduma za kisheria za uhamiaji, warsha za kujua haki zako, upya wa DACA, na utetezi dhidi ya kufukuzwa kwa jamii za wahamiaji wa tabaka la wafanyakazi."
  },
  {
    name: " Masbia Soup Kitchen Network",  // Added space
    description_es: "Comedor social kosher gratuito y despensa de alimentos que sirve comidas calientes y víveres. No se hacen preguntas, todos son bienvenidos sin importar su origen.",
    description_ar: "مطبخ حساء كوشر مجاني ومخزن طعام يقدم وجبات ساخنة ومواد غذائية. لا توجد أسئلة، الجميع مرحب بهم بغض النظر عن خلفيتهم.",
    description_he: "מטבח תמחוי כשר חינמי וחסד מזון המגישים ארוחות חמות ומצרכים. ללא שאלות, כולם מוזמנים ללא קשר לרקע.",
    description_sw: "Jiko la mchuzi wa kosher bure na ghala la chakula kinachotoa milo ya moto na vyakula. Hakuna maswali, wote wanakaribishwa bila kujali asili yao."
  },
  {
    name: " Opportunities for a Better Tomorrow (OBT)",  // Added space
    description_es: "Capacitación vocacional, colocación laboral, educación financiera y programas de educación para adultos para inmigrantes e individuos de bajos ingresos.",
    description_ar: "التدريب المهني، التوظيف، الثقافة المالية، وبرامج تعليم الكبار للمهاجرين والأفراد ذوي الدخل المنخفض.",
    description_he: "הכשרה מקצועית, השמה בעבודה, אוריינות פיננסית ותוכניות חינוך למבוגרים עבור מהגרים ואנשים בעלי הכנסה נמוכה.",
    description_sw: "Mafunzo ya kitaaluma, upatikanaji wa ajira, elimu ya fedha, na programu za elimu ya watu wazima kwa wahamiaji na watu wenye kipato cha chini."
  },
  {
    name: " Services for the UnderServed (SUS)",  // Added space
    description_es: "Programas de vivienda de apoyo para adultos anteriormente sin hogar con enfermedades mentales, VIH/SIDA y problemas de abuso de sustancias.",
    description_ar: "برامج الإسكان الداعم للبالغين الذين كانوا بلا مأوى سابقاً مع أمراض عقلية، فيروس نقص المناعة/الإيدز، ومشاكل إدمان المواد.",
    description_he: "תוכניות דיור תומך למבוגרים שהיו בעבר חסרי בית עם מחלות נפש, HIV/AIDS ובעיות שימוש לרעה בסמים.",
    description_sw: "Programu za makazi yanayosaidia watu wazima waliokuwa bila makazi awali wenye matatizo ya akili, VVU/UKIMWI, na matatizo ya matumizi mabaya ya dawa za kulevya."
  },
  {
    name: " The Door - Legal Services Center",  // Added space
    description_es: "Servicios legales gratuitos para jóvenes de 12 a 24 años, incluyendo inmigración, derecho familiar, vivienda y beneficios públicos. Horario de atención sin cita disponible.",
    description_ar: "خدمات قانونية مجانية للشباب الذين تتراوح أعمارهم بين 12 و 24 عاماً بما في ذلك الهجرة، قانون الأسرة، الإسكان، والمزايا العامة. ساعات بدون موعد متاحة.",
    description_he: "שירותים משפטיים חינמיים לבני נוער בגילאי 12-24 כולל הגירה, דיני משפחה, דיור והטבות ציבוריות. שעות קבלה ללא תור זמינות.",
    description_sw: "Huduma za kisheria bila malipo kwa vijana wa umri wa miaka 12-24 ikiwa ni pamoja na uhamiaji, sheria za familia, makazi, na faida za umma. Saa za kuingia bila miadi zinapatikana."
  },
  {
    name: "HomeBase - Bronx",  // Changed dash to regular hyphen
    description_es: "Servicios gratuitos de prevención de personas sin hogar que incluyen asistencia de alquiler, servicios legales e intervención en crisis para familias e individuos.",
    description_ar: "خدمات مجانية لمنع التشرد بما في ذلك المساعدة في الإيجار، الخدمات القانونية، والتدخل في الأزمات للعائلات والأفراد.",
    description_he: "שירותי מניעת חוסר בית חינמיים כולל סיוע בשכר דירה, שירותים משפטיים והתערבות במשבר למשפחות ויחידים.",
    description_sw: "Huduma za bure za kuzuia ukosefu wa makazi ikiwa ni pamoja na msaada wa kodi, huduma za kisheria na uingiliaji wa dharura kwa familia na watu binafsi."
  },
  {
    name: "Atlas DIY - Immigration Legal Services",
    description_es: "Servicios legales de inmigración gratuitos y de bajo costo, incluyendo solicitudes de ciudadanía, renovaciones de tarjeta verde, DACA y peticiones familiares.",
    description_ar: "خدمات قانونية مجانية ومنخفضة التكلفة للهجرة بما في ذلك طلبات الجنسية، تجديدات البطاقة الخضراء، DACA، والتماسات الأسرة.",
    description_he: "שירותים משפטיים חינמיים ובעלות נמוכה להגירה כולל בקשות אזרחות, חידושי גרין כארד, DACA ועתירות משפחתיות.",
    description_sw: "Huduma za kisheria za uhamiaji bila malipo na za gharama nafuu ikiwa ni pamoja na maombi ya uraia, upya wa kadi ya kijani, DACA na maombi ya kifamilia."
  },
  {
    name: "Bellevue Hospital - Adult Outpatient Psychiatry",
    description_es: "Servicios psiquiátricos ambulatorios que incluyen manejo de medicamentos, terapia individual e intervención en crisis. Atiende poblaciones diversas de inmigrantes.",
    description_ar: "خدمات الطب النفسي للمرضى الخارجيين بما في ذلك إدارة الأدوية، العلاج الفردي، والتدخل في الأزمات. يخدم مجموعات متنوعة من المهاجرين.",
    description_he: "שירותים פסיכיאטריים אמבולטוריים כולל ניהול תרופות, טיפול אישי והתערבות במשבר. משרת אוכלוסיות מהגרים מגוונות.",
    description_sw: "Huduma za akili za wagonjwa wa nje ikiwa ni pamoja na usimamizi wa dawa, terapia ya kibinafsi na uingiliaji wa dharura. Inahudumia jamii mbalimbali za wahamiaji."
  },
  {
    name: "Breaking Ground",
    description_es: "Vivienda de apoyo para personas y familias sin hogar, incluyendo gestión de casos, servicios de salud mental y capacitación laboral.",
    description_ar: "الإسكان الداعم للأفراد والعائلات بلا مأوى، بما في ذلك إدارة الحالات، خدمات الصحة العقلية، والتدريب الوظيفي.",
    description_he: "דיור תומך לאנשים ומשפחות חסרי בית, כולל ניהול מקרים, שירותי בריאות נפש והכשרה מקצועית.",
    description_sw: "Makazi ya kusaidia watu na familia wasio na makazi, ikiwa ni pamoja na usimamizi wa kesi, huduma za afya ya kiakili na mafunzo ya ajira."
  },
  {
    name: "Bronx Community College - Adult and Continuing Education",
    description_es: "Capacitación laboral, clases de ESL, preparación para GED, certificados vocacionales y cursos de preparación universitaria.",
    description_ar: "التدريب المهني، دروس ESL، التحضير لـ GED، الشهادات المهنية، ودورات التحضير للكلية.",
    description_he: "הכשרה מקצועית, שיעורי ESL, הכנה ל-GED, תעודות מקצועיות וקורסי הכנה לקולג'.",
    description_sw: "Mafunzo ya ajira, madarasa ya ESL, maandalizi ya GED, vyeti vya kitaaluma na kozi za maandalizi ya chuo kikuu."
  },
  {
    name: "BronxWorks - Housing Services",
    description_es: "Prevención de personas sin hogar, refugio de emergencia, vivienda de transición y colocación de vivienda permanente para familias e individuos del Bronx.",
    description_ar: "منع التشرد، المأوى الطارئ، الإسكان الانتقالي، والتنسيب في السكن الدائم للعائلات والأفراد في برونكس.",
    description_he: "מניעת חוסר בית, מקלט חירום, דיור מעבר והשמה בדיור קבוע למשפחות ויחידים בברונקס.",
    description_sw: "Kuzuia ukosefu wa makazi, makazi ya dharura, makazi ya mpito na upangaji wa makazi ya kudumu kwa familia na watu binafsi wa Bronx."
  },
  {
    name: "Brooklyn Public Library - ESL Programs",
    description_es: "Grupos de conversación en inglés gratuitos, clases de ESL para todos los niveles, preparación para ciudadanía y recursos de aprendizaje de idiomas.",
    description_ar: "مجموعات محادثة إنجليزية مجانية، دروس ESL لجميع المستويات، التحضير للجنسية، وموارد تعلم اللغة.",
    description_he: "קבוצות שיחה באנגלית חינמיות, שיעורי ESL לכל הרמות, הכנה לאזרחות ומשאבים ללימוד שפה.",
    description_sw: "Vikundi vya mazungumzo ya Kiingereza bila malipo, madarasa ya ESL kwa ngazi zote, maandalizi ya uraia na rasilimali za kujifunza lugha."
  },
  {
    name: "CUNY Adult Education Program",
    description_es: "Clases de GED, capacitación vocacional y programas de preparación universitaria.",
    description_ar: "دروس GED، التدريب المهني، وبرامج التحضير للكلية.",
    description_he: "שיעורי GED, הכשרה מקצועית ותוכניות הכנה לקולג'.",
    description_sw: "Madarasa ya GED, mafunzo ya kitaaluma na programu za maandalizi ya chuo kikuu."
  },
  {
    name: "CUNY Adult Literacy Program",
    description_es: "Educación básica gratuita para adultos, preparación para GED, clases de ESL y programas de preparación universitaria en colegios de CUNY en toda la ciudad de Nueva York.",
    description_ar: "التعليم الأساسي المجاني للبالغين، التحضير لـ GED، دروس ESL، وبرامج الاستعداد للكلية في كليات CUNY في جميع أنحاء مدينة نيويورك.",
    description_he: "חינוך בסיסי חינמי למבוגרים, הכנה ל-GED, שיעורי ESL ותוכניות מוכנות לקולג' במכללות CUNY ברחבי ניו יורק.",
    description_sw: "Elimu ya msingi ya watu wazima bila malipo, maandalizi ya GED, madarasa ya ESL na programu za maandalizi ya chuo kikuu katika vyuo vya CUNY kote New York City."
  },
  {
    name: "Callen-Lorde Community Health",
    description_es: "Atención primaria, dental, salud conductual y servicios especializados para la comunidad LGBTQ+ y personas viviendo con VIH/SIDA. Todos son bienvenidos independientemente del seguro.",
    description_ar: "الرعاية الأولية، طب الأسنان، الصحة السلوكية، والخدمات المتخصصة لمجتمع LGBTQ+ والأشخاص المصابين بفيروس نقص المناعة/الإيدز. الجميع مرحب بهم بغض النظر عن التأمين.",
    description_he: "טיפול ראשוני, שיניים, בריאות התנהגותית ושירותים מיוחדים עבור קהילת LGBTQ+ ואנשים החיים עם HIV/AIDS. כולם מוזמנים ללא קשר לביטוח.",
    description_sw: "Huduma za msingi, meno, afya ya tabia na huduma maalum kwa jamii ya LGBTQ+ na watu wanaoishi na VVU/UKIMWI. Wote wanakaribishwa bila kujali bima."
  },
  {
    name: "Catholic Charities - Immigration Services",
    description_es: "Servicios legales de inmigración, asistencia para ciudadanía, reunificación familiar y apoyo para asilo con personal multilingüe.",
    description_ar: "خدمات قانونية للهجرة، المساعدة في الجنسية، لم شمل الأسرة، ودعم اللجوء مع موظفين متعددي اللغات.",
    description_he: "שירותים משפטיים להגירה, סיוע באזרחות, איחוד משפחות ותמיכה במקלט עם צוות רב לשוני.",
    description_sw: "Huduma za kisheria za uhamiaji, msaada wa uraia, kuunganisha familia na usaidizi wa hifadhi na wafanyakazi wenye lugha nyingi."
  },
  {
    name: "Catholic Charities of New York",
    description_es: "Refugio de emergencia, vivienda de transición y vivienda de apoyo permanente para familias desplazadas.",
    description_ar: "المأوى الطارئ، الإسكان الانتقالي، والإسكان الداعم الدائم للعائلات المشردة.",
    description_he: "מקלט חירום, דיור מעבר ודיור תומך קבוע למשפחות עקורות.",
    description_sw: "Makazi ya dharura, makazi ya mpito na makazi ya kudumu yanayosaidia familia zilizohama."
  },
  {
    name: "Catholic Migration Services - Employment Program",
    description_es: "Capacitación en preparación laboral, creación de currículums, habilidades para entrevistas y asistencia de colocación laboral específicamente para inmigrantes y refugiados.",
    description_ar: "التدريب على الاستعداد الوظيفي، بناء السيرة الذاتية، مهارات المقابلة، والمساعدة في التوظيف خصيصاً للمهاجرين واللاجئين.",
    description_he: "הכשרה במוכנות לעבודה, בניית קורות חיים, כישורי ראיון וסיוע בהשמה בעבודה במיוחד עבור מהגרים ופליטים.",
    description_sw: "Mafunzo ya utayari wa kazi, uundaji wa wasifu, ujuzi wa mahojiano na usaidizi wa kupata ajira hasa kwa wahamiaji na wakimbizi."
  },
  {
    name: "Charles B. Wang Community Health Center",
    description_es: "Atención primaria, dental, salud mental y servicios sociales multilingües. Acepta Medicaid, Medicare y pacientes sin seguro.",
    description_ar: "الرعاية الأولية متعددة اللغات، طب الأسنان، الصحة العقلية، والخدمات الاجتماعية. يقبل Medicaid وMedicare والمرضى غير المؤمَّنين.",
    description_he: "טיפול ראשוני רב לשוני, שיניים, בריאות נפש ושירותים חברתיים. מקبל Medicaid, Medicare ומטופלים ללא ביטוח.",
    description_sw: "Huduma za msingi zenye lugha nyingi, meno, afya ya kiakili na huduma za kijamii. Inakubali Medicaid, Medicare na wagonjwa wasio na bima."
  },
  {
    name: "Children's Aid - Early Childhood Programs",
    description_es: "Cuidado infantil de alta calidad, educación temprana y servicios de apoyo familiar. Subsidios disponibles para familias elegibles.",
    description_ar: "رعاية أطفال عالية الجودة، التعليم المبكر، وخدمات دعم الأسرة. الإعانات متاحة للعائلات المؤهلة.",
    description_he: "טיפול ילדים איכותי, חינוך מוקדם ושירותי תמיכה משפחתיים. סובסידיות זמינות למשפחות זכאיות.",
    description_sw: "Huduma za mtoto za ubora wa juu, elimu ya mapema na huduma za kusaidia familia. Misaada inapatikana kwa familia zinazostahiki."
  },
  {
    name: "City Harvest Mobile Markets",
    description_es: "Frutas, verduras y alimentos frescos gratuitos distribuidos en mercados móviles en los cinco distritos. No se requiere registro.",
    description_ar: "فواكه وخضروات ومواد غذائية طازجة مجانية يتم توزيعها في الأسواق المتنقلة في جميع الأحياء الخمسة. لا يلزم التسجيل.",
    description_he: "פירות, ירקות ומצרכים טריים חינמיים המופצים בשווקים ניידים בחמשת הרובעים. אין צורך ברישום.",
    description_sw: "Matunda, mboga na vyakula vipya bila malipo vinavyogawanywa katika masoko ya rununu katika wilaya zote tano. Hakuna usajili unaohitajika."
  },
  {
    name: "Coalition for the Homeless",
    description_es: "Colocación en refugios de emergencia, prevención de desalojos y programas de asistencia de vivienda.",
    description_ar: "التنسيب في الملاجئ الطارئة، منع الإخلاء، وبرامج المساعدة السكنية.",
    description_he: "השמה במקלטי חירום, מניעת פינוי ותוכניות סיוע בדיור.",
    description_sw: "Upangaji wa makazi ya dharura, kuzuia ufukuzaji na programu za msaada wa makazi."
  },
  {
    name: "Ezras Choilim Health Center",
    description_es: "Atención primaria, salud de la mujer, pediatría y servicios dentales con personal multilingüe. Sirve a comunidades diversas de inmigrantes en Brooklyn.",
    description_ar: "الرعاية الأولية، صحة المرأة، طب الأطفال، وخدمات طب الأسنان مع موظفين متعددي اللغات. يخدم مجتمعات متنوعة من المهاجرين في بروكلين.",
    description_he: "טיפול ראשוני, בריאות נשים, רפואת ילדים ושירותי שיניים עם צוות רב לשוני. משרת קהילות מהגרים מגוונות בברוקלין.",
    description_sw: "Huduma za msingi, afya ya wanawake, watoto na huduma za meno na wafanyakazi wenye lugha nyingi. Inahudumia jamii mbalimbali za wahamiaji katika Brooklyn."
  },
  {
    name: "Food Bank For New York City",
    description_es: "Asistencia alimentaria de emergencia, programas de comidas y educación nutricional en toda la ciudad.",
    description_ar: "المساعدة الغذائية الطارئة، برامج الوجبات، والتثقيف الغذائي في جميع أنحاء المدينة.",
    description_he: "סיוע מזון חירום, תוכניות ארוחות וחינוך תזונתי ברחבי העיר.",
    description_sw: "Msaada wa chakula wa dharura, programu za milo na elimu ya lishe kote mjini."
  },
  {
    name: "Fountain House",
    description_es: "Servicios de recuperación y rehabilitación de salud mental que incluyen capacitación vocacional, apoyo de vivienda y comunidad de pares para adultos con enfermedades mentales graves.",
    description_ar: "خدمات التعافي وإعادة التأهيل من الأمراض العقلية بما في ذلك التدريب المهني، دعم الإسكان، ومجتمع الأقران للبالغين المصابين بأمراض عقلية خطيرة.",
    description_he: "שירותי התאוששות ושיקום בריאות נפש כולל הכשרה מקצועית, תמיכה בדיור וקהילת עמיתים למבוגרים עם מחלות נפש קשות.",
    description_sw: "Huduma za kupona na ukarabati wa afya ya kiakili ikiwa ni pamoja na mafunzo ya kitaaluma, usaidizi wa makazi na jamii ya wenzao kwa watu wazima wenye magonjwa makubwa ya kiakili."
  },
  {
    name: "Goddard Riverside - Housing Services",
    description_es: "Colocación de vivienda, prevención de desalojos y servicios de apoyo para familias e individuos de bajos ingresos.",
    description_ar: "التنسيب السكني، منع الإخلاء، والخدمات الداعمة للعائلات والأفراد ذوي الدخل المنخفض.",
    description_he: "השמה בדיור, מניעת פינוי ושירותי תמיכה למשפחות ויחידים בעלי הכנסה נמוכה.",
    description_sw: "Upangaji wa makazi, kuzuia ufukuzaji na huduma za kusaidia familia na watu binafsi wenye kipato cha chini."
  },
  {
    name: "HELP USA",
    description_es: "Vivienda de transición y de apoyo permanente para familias e individuos sin hogar. También proporciona capacitación laboral y servicios de cuidado infantil.",
    description_ar: "الإسكان الانتقالي والداعم الدائم للعائلات والأفراد بلا مأوى. يوفر أيضاً التدريب الوظيفي وخدمات رعاية الأطفال.",
    description_he: "דיור מעבר ותומך קבוע למשפחות ויחידים חסרי בית. מספק גם הכשרה מקצועית ושירותי טיפול בילדים.",
    description_sw: "Makazi ya mpito na ya kudumu yanayosaidia familia na watu binafsi wasio na makazi. Pia hutoa mafunzo ya ajira na huduma za utunzaji wa watoto."
  },
  {
    name: "Henry Street Settlement - Workforce Development",
    description_es: "Capacitación laboral, asesoramiento profesional, clases de alfabetización informática y servicios de colocación laboral para residentes de Lower East Side e inmigrantes.",
    description_ar: "التدريب الوظيفي، الإرشاد المهني، دروس محو الأمية الحاسوبية، وخدمات التوظيف لسكان لوار إيست سايد والمهاجرين.",
    description_he: "הכשרה מקצועית, ייעוץ קריירה, שיעורי אוריינות מחשב ושירותי השמה בעבודה לתושבי Lower East Side ומהגרים.",
    description_sw: "Mafunzo ya ajira, ushauri wa kazi, madarasa ya ujuzi wa kompyuta na huduma za kupata ajira kwa wakazi wa Lower East Side na wahamiaji."
  },
  {
    name: "Her Justice",
    description_es: "Servicios legales gratuitos para mujeres necesitadas, incluyendo inmigración, derecho familiar, órdenes de protección por violencia doméstica y asuntos de vivienda.",
    description_ar: "خدمات قانونية مجانية للنساء المحتاجات، بما في ذلك الهجرة، قانون الأسرة، أوامر حماية العنف المنزلي، والمسائل السكنية.",
    description_he: "שירותים משפטיים חינמיים לנשים נזקקות, כולל הגירה, דיני משפחה, צווי הגנה מאלימות במשפחה ועניני דיור.",
    description_sw: "Huduma za kisheria bila malipo kwa wanawake wahitaji, ikiwa ni pamoja na uhamiaji, sheria za familia, amri za ulinzi dhidi ya unyanyasaji wa nyumbani na masuala ya makazi."
  },
  {
    name: "Holy Apostles Soup Kitchen",
    description_es: "Almuerzo caliente gratuito servido diariamente, uno de los comedores sociales más grandes de Nueva York. Sirve más de 1,000 comidas por día con dignidad y respeto.",
    description_ar: "غداء ساخن مجاني يُقدم يومياً، أحد أكبر مطابخ الحساء في مدينة نيويورك. يخدم أكثر من 1000 وجبة يومياً بكرامة واحترام.",
    description_he: "ארוחת צהריים חמה חינמית המוגשת מדי יום, אחד ממטבחי התמחוי הגדולים ביותר בניו יורק. מגיש יותר מ-1,000 ארוחות ביום בכבוד ובכבוד.",
    description_sw: "Chakula cha mchana moto bila malipo kinachotolewa kila siku, moja ya majiko makubwa zaidi ya mchuzi huko New York City. Inatoa zaidi ya milo 1,000 kwa siku kwa heshima na hadhi."
  },
  {
    name: "Hostos Community College - Adult Education",
    description_es: "Clases gratuitas de GED, instrucción de ESL, preparación universitaria y programas de desarrollo laboral para residentes del Bronx.",
    description_ar: "دروس GED المجانية، تعليم ESL، التحضير للكلية، وبرامج تطوير القوى العاملة لسكان برونكس.",
    description_he: "שיעורי GED חינמיים, הוראת ESL, הכנה לקולג' ותוכניות פיתוח כוח אדם לתושבי ברונקס.",
    description_sw: "Madarasa ya bure ya GED, mafundisho ya ESL, maandalizi ya chuo kikuu na programu za maendeleo ya ajira kwa wakazi wa Bronx."
  },
  {
    name: "Immigrant Justice Corps",
    description_es: "Servicios legales gratuitos para inmigrantes detenidos, defensa contra deportación, solicitudes de asilo y reunificación familiar. Los becarios brindan representación en toda la ciudad de Nueva York.",
    description_ar: "خدمات قانونية مجانية للمهاجرين المحتجزين، الدفاع ضد الترحيل، طلبات اللجوء، ولم شمل الأسرة. يقدم الزملاء التمثيل في جميع أنحاء مدينة نيويورك.",
    description_he: "שירותים משפטיים חינמיים למהגרים עצורים, הגנה מפני גירוש, בקשות מקלט ואיחוד משפחות. עמיתים מספקים ייצוג ברחבי ניו יורק.",
    description_sw: "Huduma za kisheria bila malipo kwa wahamiaji waliofungwa, utetezi dhidi ya kufukuzwa, maombi ya hifadhi na kuunganisha familia. Wanachama hutoa uwakilishi kote New York City."
  },
  {
    name: "Interfaith Center of New York",
    description_es: "Clases gratuitas de ESL, orientación cultural y programa de integración comunitaria.",
    description_ar: "دروس ESL المجانية، التوجيه الثقافي، وبرنامج التكامل المجتمعي.",
    description_he: "שיעורי ESL חינמיים, התמצאות תרבותית ותוכנית שילוב קהילתי.",
    description_sw: "Madarasa ya bure ya ESL, uelekeo wa kitamaduni na programu ya ujumuishaji wa jamii."
  },
  {
    name: "International Rescue Committee (IRC) NYC",
    description_es: "Capacitación laboral, ayuda con currículums, clases de ESL y servicios de reasentamiento para refugiados y solicitantes de asilo.",
    description_ar: "التدريب الوظيفي، المساعدة في السيرة الذاتية، دروس ESL، وخدمات إعادة التوطين للاجئين وطالبي اللجوء.",
    description_he: "הכשרה מקצועית, עזרה בקורות חיים, שיעורי ESL ושירותי קליטה לפליטים ומבקשי מקלט.",
    description_sw: "Mafunzo ya ajira, msaada wa wasifu, madarasa ya ESL na huduma za uhamishaji kwa wakimbizi na wanaotafuta hifadhi."
  },
  {
    name: "Jamaica Hospital Medical Center",
    description_es: "Hospital de servicio completo con personal multilingüe, servicios de salud para inmigrantes y programas de asistencia financiera para pacientes sin seguro.",
    description_ar: "مستشفى كامل الخدمات مع موظفين متعددي اللغات، خدمات صحة المهاجرين، وبرامج المساعدة المالية للمرضى غير المؤمَّنين.",
    description_he: "בית חולים בשירות מלא עם צוות רב לשוני, שירותי בריאות מהגרים ותוכניות סיוע כספי למטופלים ללא ביטוח.",
    description_sw: "Hospitali yenye huduma kamili na wafanyakazi wenye lugha nyingi, huduma za afya za wahamiaji na programu za msaada wa kifedha kwa wagonjwa wasio na bima."
  },
  {
    name: "Jewish Board of Family and Children's Services",
    description_es: "Asesoramiento de salud mental, intervención en crisis y grupos de apoyo para individuos y familias. Servicios disponibles en varios idiomas.",
    description_ar: "الاستشارات في الصحة العقلية، التدخل في الأزمات، ومجموعات الدعم للأفراد والعائلات. الخدمات متاحة بعدة لغات.",
    description_he: "ייעוץ בריאות נפש, התערבות במשבר וקבוצות תמיכה ליחידים ומשפחות. שירותים זמינים במספר שפות.",
    description_sw: "Ushauri wa afya ya kiakili, uingiliaji wa dharura na vikundi vya msaada kwa watu binafsi na familia. Huduma zinapatikana katika lugha kadhaa."
  },
  {
    name: "Kingsborough Community College - Continuing Education",
    description_es: "Clases de ESL, capacitación vocacional, habilidades informáticas, certificaciones de atención médica y cursos de preparación universitaria.",
    description_ar: "دروس ESL، التدريب المهني، مهارات الحاسوب، شهادات الرعاية الصحية، ودورات التحضير للكلية.",
    description_he: "שיעורי ESL, הכשרה מקצועית, כישורי מחשב, הסמכות שירותי בריאות וקורסי הכנה לקולג'.",
    description_sw: "Madarasa ya ESL, mafunzo ya kitaaluma, ujuzi wa kompyuta, vyeti vya huduma za afya na kozi za maandalizi ya chuo kikuu."
  },
  {
    name: "Literacy Assistance Center",
    description_es: "Programas gratuitos de alfabetización para adultos, clases de ESL, preparación para GED y asesoramiento educativo. Ayuda a conectar a los estudiantes con programas en toda la ciudad.",
    description_ar: "برامج محو الأمية المجانية للبالغين، دروس ESL، التحضير لـ GED، والاستشارات التعليمية. يساعد في ربط الطلاب بالبرامج في جميع أنحاء المدينة.",
    description_he: "תוכניות אוריינות חינמיות למבוגרים, שיעורי ESL, הכנה ל-GED וייעוץ חינוכי. עוזר לחבר תלמידים לתוכניות ברחבי העיר.",
    description_sw: "Programu za ujuzi wa kusoma na kuandika za bure kwa watu wazima, madarasa ya ESL, maandalizi ya GED na ushauri wa elimu. Husaidia kuunganisha wanafunzi na programu kote mjini."
  },
  {
    name: "Mount Sinai Immigrant Health Program",
    description_es: "Atención médica multilingüe, servicios de salud mental y asistencia para inscripción en seguro de salud.",
    description_ar: "الرعاية الصحية متعددة اللغات، خدمات الصحة العقلية، والمساعدة في التسجيل في التأمين الصحي.",
    description_he: "שירותי בריאות רב לשוניים, שירותי בריאות נפש וסיוע בהרשמה לביטוח בריאות.",
    description_sw: "Huduma za afya zenye lugha nyingi, huduma za afya ya kiakili na msaada wa kusajili bima ya afya."
  },
  {
    name: "NAMI NYC (National Alliance on Mental Illness)",
    description_es: "Apoyo de salud mental, programas educativos, grupos de apoyo entre pares y servicios de defensa para individuos y familias.",
    description_ar: "دعم الصحة العقلية، البرامج التعليمية، مجموعات دعم الأقران، وخدمات الدفاع للأفراد والعائلات.",
    description_he: "תמיכה בבריאות נפש, תוכניות חינוכיות, קבוצות תמיכת עמיתים ושירותי סנגור ליחידים ומשפחות.",
    description_sw: "Msaada wa afya ya kiakili, programu za elimu, vikundi vya msaada wa wenzao na huduma za utetezi kwa watu binafsi na familia."
  },
  {
    name: "NYC Child Care Connect",
    description_es: "Referencias gratuitas a programas de cuidado infantil con licencia, información sobre subsidios y vales, y apoyo para encontrar cuidado infantil de calidad.",
    description_ar: "إحالات مجانية لبرامج رعاية الأطفال المرخصة، معلومات عن الإعانات والقسائم، والدعم في العثور على رعاية أطفال عالية الجودة.",
    description_he: "הפניות חינמיות לתוכניות טיפול בילדים מורשות, מידע על סובסידיות ושוברים ותמיכה במציאת טיפול ילדים איכותי.",
    description_sw: "Rufaa za bure kwa programu za utunzaji wa watoto zenye leseni, habari kuhusu misaada na vocha, na msaada kupata utunzaji wa watoto wa ubora."
  },
  {
    name: "NYC Children's Center - Family Mental Health",
    description_es: "Terapia familiar, asesoramiento individual y servicios psiquiátricos con atención culturalmente competente para familias inmigrantes.",
    description_ar: "العلاج الأسري، الاستشارات الفردية، والخدمات النفسية مع رعاية مختصة ثقافياً للعائلات المهاجرة.",
    description_he: "טיפול משפחתי, ייעוץ אישי ושירותים פסיכיאטריים עם טיפול רגיש תרבותית למשפחות מהגרים.",
    description_sw: "Terapia ya familia, ushauri wa kibinafsi na huduma za akili zenye uelewa wa kitamaduni kwa familia za wahamiaji."
  },
  {
    name: "NYC Department of Education - 3-K and Pre-K",
    description_es: "Educación infantil temprana gratuita y de día completo de alta calidad para niños de 3 y 4 años en escuelas y organizaciones comunitarias en toda la ciudad.",
    description_ar: "تعليم مبكر عالي الجودة مجاني وطوال اليوم للأطفال من عمر 3 و 4 سنوات في المدارس والمنظمات المجتمعية في جميع أنحاء المدينة.",
    description_he: "חינוך מוקדם איכותי חינמי ביום מלא לילדים בני 3 ו-4 בבתי ספר וארגונים קהילתיים ברחבי העיר.",
    description_sw: "Elimu ya mapema ya watoto wa ubora wa juu, bila malipo na siku nzima kwa watoto wa umri wa miaka 3 na 4 katika shule na mashirika ya jamii kote mjini."
  },
  {
    name: "NYC Health + Hospitals/Bellevue",
    description_es: "Hospital de servicio completo con personal multilingüe y programa especializado de salud para refugiados.",
    description_ar: "مستشفى كامل الخدمات مع موظفين متعددي اللغات وبرنامج صحي متخصص للاجئين.",
    description_he: "בית חולים בשירות מלא עם צוות רב לשוני ותוכנית בריאות מיוחדת לפליטים.",
    description_sw: "Hospitali yenye huduma kamili na wafanyakazi wenye lugha nyingi na programu maalum ya afya kwa wakimbizi."
  },
  {
    name: "NYC Well - Mental Health Support",
    description_es: "Apoyo gratuito y confidencial de salud mental por teléfono, texto o chat. Disponible 24/7 en más de 200 idiomas.",
    description_ar: "دعم مجاني وسري للصحة العقلية عبر الهاتف أو الرسائل النصية أو الدردشة. متاح 24/7 بأكثر من 200 لغة.",
    description_he: "תמיכה חינמית וסודית בבריאות נפש בטלפון, הודעות טקסט או צ'אט. זמין 24/7 ביותר מ-200 שפות.",
    description_sw: "Msaada wa bure na wa siri wa afya ya kiakili kupitia simu, ujumbe au gumzo. Inapatikana 24/7 katika lugha zaidi ya 200."
  },
  {
    name: "NYC Workforce1 Career Centers",
    description_es: "Asistencia gratuita de búsqueda de empleo, capacitación de habilidades, talleres de currículums, preparación para entrevistas y conexiones con empleadores que contratan ahora.",
    description_ar: "المساعدة المجانية في البحث عن عمل، التدريب على المهارات، ورش عمل السيرة الذاتية، التحضير للمقابلات، والاتصالات مع أصحاب العمل الذين يوظفون الآن.",
    description_he: "סיוע חינמי בחיפוש עבודה, הכשרת מיומנויות, סדנאות קורות חיים, הכנה לראיונות וקשרים עם מעסיקים שמגייסים כעת.",
    description_sw: "Msaada wa bure wa kutafuta kazi, mafunzo ya ujuzi, warsha za wasifu, maandalizi ya mahojiano na miunganisho na waajiri wanaohudumia sasa."
  },
  {
    name: "New York Legal Assistance Group (NYLAG)",
    description_es: "Servicios gratuitos de derecho de inmigración, defensa de derechos de vivienda y asistencia de derecho familiar.",
    description_ar: "خدمات قانون الهجرة المجانية، الدفاع عن حقوق الإسكان، والمساعدة في قانون الأسرة.",
    description_he: "שירותי דיני הגירה חינמיים, סנגור לזכויות דיור וסיוע בדיני משפחה.",
    description_sw: "Huduma za bure za sheria za uhamiaji, utetezi wa haki za makazi na msaada wa sheria za familia."
  },
  {
    name: "New York Public Library - Adult Learning Centers",
    description_es: "Clases gratuitas de ESL, capacitación en habilidades informáticas, recursos profesionales, preparación para GED y programas de alfabetización en sucursales de bibliotecas.",
    description_ar: "دروس ESL المجانية، التدريب على مهارات الحاسوب، موارد مهنية، التحضير لـ GED، وبرامج محو الأمية في فروع المكتبة.",
    description_he: "שיעורי ESL חינמיים, הכשרת כישורי מחשב, משאבים מקצועיים, הכנה ל-GED ותוכניות אוריינות בסניפי ספרייה.",
    description_sw: "Madarasa ya bure ya ESL, mafunzo ya ujuzi wa kompyuta, rasilimali za kazi, maandalizi ya GED na programu za ujuzi wa kusoma na kuandika katika matawi ya maktaba."
  },
  {
    name: " Part of the Solution (POTS)",
    description_es: "Comidas calientes diarias, despensa de alimentos, educación nutricional y servicios sociales para residentes del Bronx. Sirve más de 900 comidas diarias.",
    description_ar: "وجبات ساخنة يومية، مخزن الطعام، التثقيف الغذائي، والخدمات الاجتماعية لسكان برونكس. يقدم أكثر من 900 وجبة يومياً.",
    description_he: "ארוחות חמות יומיות, חסד מזון, חינוך תזונתי ושירותים חברתיים לתושבי ברונקס. מגיש יותר מ-900 ארוחות ביום.",
    description_sw: "Milo ya moto ya kila siku, ghala la chakula, elimu ya lishe na huduma za kijamii kwa wakazi wa Bronx. Inatoa zaidi ya milo 900 kwa siku."
  },
  {
    name: "Per Scholas",
    description_es: "Capacitación tecnológica gratuita y colocación profesional en campos de TI. Los programas incluyen ingeniería de software, ciberseguridad y soporte de TI con apoyo de colocación laboral.",
    description_ar: "التدريب التقني المجاني والتوظيف المهني في مجالات تكنولوجيا المعلومات. تشمل البرامج هندسة البرمجيات، الأمن السيبراني، ودعم تكنولوجيا المعلومات مع دعم التوظيف.",
    description_he: "הכשרה טכנולוגית חינמית והשמה מקצועית בתחומי IT. תוכניות כוללות הנדסת תוכנה, אבטחת סייבר ותמיכת IT עם תמיכה בהשמה בעבודה.",
    description_sw: "Mafunzo ya bure ya teknolojia na upangaji wa kazi katika nyanja za IT. Programu ni pamoja na uhandisi wa programu, usalama wa mtandao na msaada wa IT na msaada wa kupata ajira."
  },
  {
    name: "Project Renewal - Mental Health Services",
    description_es: "Servicios de salud mental para personas sin hogar y anteriormente sin hogar, incluyendo atención informada sobre trauma y apoyo para abuso de sustancias.",
    description_ar: "خدمات الصحة العقلية للأشخاص بلا مأوى وسابقاً بلا مأوى، بما في ذلك الرعاية المطلعة على الصدمات ودعم تعاطي المواد المخدرة.",
    description_he: "שירותי בריאות נפש לאנשים חסרי בית ובעבר חסרי בית, כולל טיפול מודע לטראומה ותמיכה בשימוש לרעה בסמים.",
    description_sw: "Huduma za afya ya kiakili kwa watu wasio na makazi na waliokuwa hapo awali wasio na makazi, ikiwa ni pamoja na huduma zinazojua kuhusu kiwewe na msaada wa matumizi mabaya ya dawa za kulevya."
  },
  {
    name: "Queens Public Library - New Americans Program",
    description_es: "Clases gratuitas de ESL, preparación para ciudadanía, clases de computación y programas de preparación laboral para inmigrantes y refugiados.",
    description_ar: "دروس ESL المجانية، التحضير للجنسية، دروس الحاسوب، وبرامج الاستعداد الوظيفي للمهاجرين واللاجئين.",
    description_he: "שיעורי ESL חינמיים, הכנה לאזרחות, שיעורי מחשב ותוכניות מוכנות לעבודה למהגרים ופליטים.",
    description_sw: "Madarasa ya bure ya ESL, maandalizi ya uraia, madarasa ya kompyuta na programu za utayari wa kazi kwa wahamiaji na wakimbizi."
  },
  {
    name: "Ryan Health - Frederick Douglass",
    description_es: "Atención primaria integral, pediatría, salud de la mujer, dental y servicios de salud conductual. Escala de tarifas móvil disponible.",
    description_ar: "الرعاية الأولية الشاملة، طب الأطفال، صحة المرأة، طب الأسنان، وخدمات الصحة السلوكية. تتوفر رسوم متدرجة.",
    description_he: "טיפול ראשוני מקיף, רפואת ילדים, בריאות נשים, שיניים ושירותי בריאות התנהגותית. סולם תשלום מותאם זמין.",
    description_sw: "Huduma kamili za msingi, watoto, afya ya wanawake, meno na huduma za afya ya tabia. Bei inayotegemea kipato inapatikana."
  },
  {
    name: "SNAP Benefits - ACCESS HRA",
    description_es: "Beneficios mensuales de asistencia alimentaria para individuos y familias elegibles de bajos ingresos. Solicite en línea o en oficinas locales de HRA.",
    description_ar: "مزايا المساعدة الغذائية الشهرية للأفراد والعائلات المؤهلين ذوي الدخل المنخفض. قدم الطلب عبر الإنترنت أو في مكاتب HRA المحلية.",
    description_he: "הטבות סיוע מזון חודשיות ליחידים ומשפחות זכאים בעלי הכנסה נמוכה. הגש בקשה באינטרנט או במשרדי HRA מקומיים.",
    description_sw: "Faida za msaada wa chakula za kila mwezi kwa watu binafsi na familia zinazostahiki zenye kipato cha chini. Omba mtandaoni au katika ofisi za HRA za eneo lako."
  },
  {
    name: "STRIVE International",
    description_es: "Capacitación intensiva en preparación laboral, desarrollo de habilidades blandas y conexiones con empleadores para personas que enfrentan barreras para el empleo.",
    description_ar: "التدريب المكثف على الاستعداد الوظيفي، تطوير المهارات الناعمة، والاتصالات مع أصحاب العمل للأفراد الذين يواجهون عوائق أمام التوظيف.",
    description_he: "הכשרה אינטנסיבית למוכנות לעבודה, פיתוח מיומנויות רכות וקשרים עם מעסיקים עבור אנשים המתמודדים עם מחסומים לתעסוקה.",
    description_sw: "Mafunzo makali ya utayari wa kazi, maendeleo ya ujuzi laini na miunganisho na waajiri kwa watu wanaokabiliwa na vikwazo vya ajira."
  },
  {
    name: "Safe Horizon - Immigration Law Project",
    description_es: "Servicios legales gratuitos para sobrevivientes inmigrantes de violencia doméstica, trata de personas y otros delitos. Asistencia con VAWA y Visa U.",
    description_ar: "خدمات قانونية مجانية للناجين المهاجرين من العنف المنزلي والاتجار بالبشر والجرائم الأخرى. المساعدة في VAWA وتأشيرة U.",
    description_he: "שירותים משפטיים חינמיים לניצולים מהגרים של אלימות במשפחה, סחר בבני אדם ופשעים אחרים. סיוע ב-VAWA וויזת U.",
    description_sw: "Huduma za bure za kisheria kwa walionusurika wa wahamiaji kutokana na unyanyasaji wa nyumbani, biashara ya watu na uhalifu mwingine. Msaada wa VAWA na Visa U."
  },
  {
    name: "Samaritan Daytop Village",
    description_es: "Programas de tratamiento de salud mental y abuso de sustancias con personal bilingüe y atención culturalmente sensible.",
    description_ar: "برامج علاج الصحة العقلية وتعاطي المواد المخدرة مع موظفين ثنائيي اللغة ورعاية حساسة ثقافياً.",
    description_he: "תוכניות טיפול בריאות נפש ושימוש לרעה בסמים עם צוות דו לשוני וטיפול רגיש תרבותית.",
    description_sw: "Programu za matibabu ya afya ya kiakili na matumizi mabaya ya dawa za kulevya na wafanyakazi wenye lugha mbili na huduma zinazozingatia utamaduni."
  },
  {
    name: "The Institute for Family Health - Behavioral Health",
    description_es: "Servicios integrales de salud mental que incluyen asesoramiento, terapia y atención psiquiátrica. Acepta Medicaid y ofrece tarifas de escala móvil.",
    description_ar: "خدمات الصحة العقلية الشاملة بما في ذلك الاستشارة، العلاج، والرعاية النفسية. يقبل Medicaid ويقدم رسوماً متدرجة.",
    description_he: "שירותי בריאות נפש מקיפים כולל ייעוץ, טיפול וטיפול פסיכיאטרי. מקבל Medicaid ומציע עמלות סולם נע.",
    description_sw: "Huduma kamili za afya ya kiakili ikiwa ni pamoja na ushauri, terapia na huduma za akili. Inakubali Medicaid na inatoa ada za kiasi kinachotofautiana."
  },
  {
    name: "The Legal Aid Society",
    description_es: "Representación legal gratuita para inmigración, vivienda y asuntos de derecho familiar.",
    description_ar: "التمثيل القانوني المجاني للهجرة، الإسكان، ومسائل قانون الأسرة.",
    description_he: "ייצוג משפטי חינמי להגירה, דיור ועניני דיני משפחה.",
    description_sw: "Uwakilishi wa kisheria wa bure kwa uhamiaji, makazi na masuala ya sheria za familia."
  },
  {
    name: "The Legal Aid Society - Immigration Law Unit",
    description_es: "Representación legal gratuita para inmigración, asilo, defensa contra deportación, derecho familiar y asuntos de vivienda para neoyorquinos de bajos ingresos.",
    description_ar: "التمثيل القانوني المجاني للهجرة، اللجوء، الدفاع ضد الترحيل، قانون الأسرة، ومسائل الإسكان لسكان نيويورك ذوي الدخل المنخفض.",
    description_he: "ייצוג משפטי חינמי להגירה, מקלט, הגנה מפני גירוש, דיני משפחה ועניני דיור לתושבי ניו יורק בעלי הכנסה נמוכה.",
    description_sw: "Uwakilishi wa kisheria wa bure kwa uhamiaji, hifadhi, utetezi dhidi ya kufukuzwa, sheria za familia na masuala ya makazi kwa wakazi wa New York wenye kipato cha chini."
  },
  {
    name: "Transitional Services for New York (TSINY)",
    description_es: "Servicios de salud mental para comunidades de inmigrantes y refugiados, incluyendo asesoramiento de trauma, evaluación psiquiátrica y gestión de casos en varios idiomas.",
    description_ar: "خدمات الصحة العقلية لمجتمعات المهاجرين واللاجئين، بما في ذلك الاستشارة في الصدمات، التقييم النفسي، وإدارة الحالات بعدة لغات.",
    description_he: "שירותי בריאות נפש לקהילות מהגרים ופליטים, כולל ייעוץ טראומה, הערכה פסיכיאטרית וניהול מקרים במספר שפות.",
    description_sw: "Huduma za afya ya kiakili kwa jamii za wahamiaji na wakimbizi, ikiwa ni pamoja na ushauri wa kiwewe, tathmini ya akili na usimamizi wa kesi katika lugha nyingi."
  },
  {
    name: "Urban Pathways",
    description_es: "Refugio de emergencia, vivienda de transición y vivienda de apoyo permanente con servicios en el lugar.",
    description_ar: "المأوى الطارئ، الإسكان الانتقالي، والإسكان الداعم الدائم مع الخدمات في الموقع.",
    description_he: "מקלט חירום, דיור מעבר ודיור תומך קבוע עם שירותים באתר.",
    description_sw: "Makazi ya dharura, makazi ya mpito na makazi ya kudumu yanayosaidia na huduma eneo husika."
  },
  {
    name: "Volunteers of America - Greater New York",
    description_es: "Refugio de emergencia, vivienda de transición y vivienda de apoyo permanente con gestión de casos y servicios de salud mental.",
    description_ar: "المأوى الطارئ، الإسكان الانتقالي، والإسكان الداعم الدائم مع إدارة الحالات وخدمات الصحة العقلية.",
    description_he: "מקלט חירום, דיור מעבר ודיור תומך קבוע עם ניהול מקרים ושירותי בריאות נפש.",
    description_sw: "Makazi ya dharura, makazi ya mpito na makazi ya kudumu yanayosaidia na usimamizi wa kesi na huduma za afya ya kiakili."
  },
  {
    name: "West Side Campaign Against Hunger",
    description_es: "Despensa de alimentos de emergencia que proporciona comestibles, productos frescos y asesoramiento nutricional. Modelo de compras basado en elección que respeta la dignidad del cliente.",
    description_ar: "مخزن الطعام الطارئ الذي يوفر البقالة والمنتجات الطازجة والاستشارات الغذائية. نموذج التسوق القائم على الاختيار يحترم كرامة العميل.",
    description_he: "מזווה מזון חירום המספק מצרכים, תוצרת טרייה וייעוץ תזונתי. מודל קניות מבוסס בחירה המכבד את כבוד הלקוח.",
    description_sw: "Ghala la chakula la dharura linachotoa vyakula vya kununua, mazao mapya na ushauri wa lishe. Mfano wa ununuzi wa kuchagua unaoheshimu hadhi ya mteja."
  },
  {
    name: "Women In Need (WIN)",
    description_es: "Refugio de emergencia y vivienda de apoyo exclusivamente para madres sin hogar y sus hijos. Incluye cuidado infantil, capacitación laboral y programas educativos.",
    description_ar: "المأوى الطارئ والإسكان الداعم حصرياً للأمهات بلا مأوى وأطفالهن. يتضمن رعاية الأطفال، التدريب الوظيفي، والبرامج التعليمية.",
    description_he: "מקלט חירום ודיור תומך באופן בלעדי לאמהות חסרות בית וילדיהן. כולל טיפול בילדים, הכשרה מקצועית ותוכניות חינוכיות.",
    description_sw: "Makazi ya dharura na ya kusaidia kwa mama wasio na makazi na watoto wao pekee. Inajumuisha utunzaji wa watoto, mafunzo ya ajira na programu za elimu."
  },
  {
    name: "YMCA of Greater New York - Adult ESL",
    description_es: "Clases asequibles de ESL, capacitación en alfabetización informática y programas de desarrollo laboral en sucursales de YMCA en toda la ciudad de Nueva York.",
    description_ar: "دروس ESL بأسعار معقولة، التدريب على محو الأمية الحاسوبية، وبرامج تطوير القوى العاملة في فروع YMCA في جميع أنحاء مدينة نيويورك.",
    description_he: "שיעורי ESL במחיר סביר, הכשרת אוריינות מחשב ותוכניות פיתוח כוח אדם בסניפי YMCA ברחבי ניו יורק.",
    description_sw: "Madarasa ya bei nafuu ya ESL, mafunzo ya ujuzi wa kompyuta na programu za maendeleo ya ajira katika matawi ya YMCA kote New York City."
  }
];

module.exports = translations;