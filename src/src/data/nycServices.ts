export interface Service {
  name: string;
  address: string;
  phone: string;
  hours: string;
  website: string;
  category: string;
  description: string;
  languages?: string[];
  eligibility?: string;
}

export const nycServices: Service[] = [
  // HOUSING SERVICES
  {
    name: "Coalition for the Homeless",
    address: "129 Fulton Street, New York, NY 10038",
    phone: "(212) 776-2000",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.coalitionforthehomeless.org",
    category: "housing",
    description: "Emergency shelter placement, eviction prevention, housing assistance, and advocacy for homeless families and individuals.",
    languages: ["English", "Spanish"],
    eligibility: "Homeless individuals and families in NYC"
  },
  {
    name: "Breaking Ground",
    address: "505 Eighth Avenue, 7th Floor, New York, NY 10018",
    phone: "(212) 389-9300",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.breakingground.org",
    category: "housing",
    description: "Supportive housing for formerly homeless individuals with mental illness, HIV/AIDS, or substance abuse issues.",
    languages: ["English", "Spanish"],
    eligibility: "Formerly homeless adults"
  },
  {
    name: "Urban Pathways",
    address: "575 8th Avenue, 7th Floor, New York, NY 10018",
    phone: "(212) 730-0406",
    hours: "24/7 Crisis Line",
    website: "https://www.urbanpathways.org",
    category: "housing",
    description: "Emergency shelter, transitional housing, permanent supportive housing, and outreach services.",
    languages: ["English", "Spanish", "French"],
    eligibility: "Homeless adults in NYC"
  },
  {
    name: "Goddard Riverside Community Center - Housing",
    address: "593 Columbus Avenue, New York, NY 10024",
    phone: "(212) 873-6600",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.goddard.org",
    category: "housing",
    description: "Affordable housing programs, rental assistance, and housing counseling for low-income families.",
    languages: ["English", "Spanish"],
    eligibility: "Low-income NYC residents"
  },

  // HEALTHCARE SERVICES
  {
    name: "NYC Health + Hospitals/Bellevue",
    address: "462 First Avenue, New York, NY 10016",
    phone: "(212) 562-4141",
    hours: "24/7 Emergency Care",
    website: "https://www.nychealthandhospitals.org/bellevue",
    category: "healthcare",
    description: "Comprehensive hospital care including refugee health program, mental health services, and multilingual support.",
    languages: ["English", "Spanish", "Chinese", "Russian", "Arabic"],
    eligibility: "All NYC residents, regardless of ability to pay"
  },
  {
    name: "Charles B. Wang Community Health Center",
    address: "268 Canal Street, New York, NY 10013",
    phone: "(212) 379-6988",
    hours: "Mon-Fri 8AM-8PM, Sat 8AM-4PM",
    website: "https://www.cbwchc.org",
    category: "healthcare",
    description: "Primary care, dental, behavioral health, and social services with focus on Asian immigrant communities.",
    languages: ["English", "Mandarin", "Cantonese", "Vietnamese"],
    eligibility: "All NYC residents"
  },
  {
    name: "Institute for Family Health",
    address: "Multiple locations across NYC",
    phone: "(212) 633-0800",
    hours: "Varies by location",
    website: "https://www.institute.org",
    category: "healthcare",
    description: "Primary care, dental, behavioral health, and specialty services for underserved communities.",
    languages: ["English", "Spanish", "Arabic", "Bengali"],
    eligibility: "All NYC residents"
  },
  {
    name: "Ryan Health Center",
    address: "110 West 97th Street, New York, NY 10025",
    phone: "(212) 316-7906",
    hours: "Mon-Fri 8AM-8PM",
    website: "https://www.ryanhealth.org",
    category: "healthcare",
    description: "Affordable primary care, dental, mental health, and HIV/AIDS services.",
    languages: ["English", "Spanish"],
    eligibility: "All NYC residents, sliding fee scale"
  },

  // LEGAL SERVICES
  {
    name: "The Legal Aid Society",
    address: "199 Water Street, New York, NY 10038",
    phone: "(212) 577-3300",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.legalaidnyc.org",
    category: "legal",
    description: "Free legal representation for immigration, asylum, deportation defense, housing, and family matters.",
    languages: ["English", "Spanish", "Chinese", "Bengali", "Haitian Creole"],
    eligibility: "Low-income NYC residents"
  },
  {
    name: "New York Legal Assistance Group (NYLAG)",
    address: "7 Hanover Square, 18th Floor, New York, NY 10004",
    phone: "(212) 613-5000",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.nylag.org",
    category: "legal",
    description: "Free civil legal services for immigration, housing, public benefits, healthcare, and elder law.",
    languages: ["English", "Spanish", "Russian", "Chinese"],
    eligibility: "Low-income individuals and families"
  },
  {
    name: "Safe Passage Project",
    address: "80 Maiden Lane, Suite 502, New York, NY 10038",
    phone: "(212) 324-6558",
    hours: "Mon-Fri 9AM-6PM",
    website: "https://www.safepassageproject.org",
    category: "legal",
    description: "Free legal representation for unaccompanied immigrant children in removal proceedings.",
    languages: ["English", "Spanish"],
    eligibility: "Unaccompanied immigrant children"
  },
  {
    name: "Catholic Charities Immigration Legal Services",
    address: "1011 First Avenue, 12th Floor, New York, NY 10022",
    phone: "(212) 419-3700",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://catholiccharitiesny.org",
    category: "legal",
    description: "Immigration legal services including asylum, family reunification, citizenship, and DACA.",
    languages: ["English", "Spanish", "Arabic", "French"],
    eligibility: "All immigrants, low-cost or free"
  },

  // EMPLOYMENT SERVICES
  {
    name: "International Rescue Committee (IRC) - Employment",
    address: "122 East 42nd Street, New York, NY 10168",
    phone: "(212) 377-4728",
    hours: "Mon-Fri 8:30AM-5PM",
    website: "https://www.rescue.org/united-states/new-york-city-ny",
    category: "employment",
    description: "Job training, resume assistance, interview prep, ESL classes, and career counseling for refugees.",
    languages: ["English", "Spanish", "Arabic", "French", "Dari", "Pashto"],
    eligibility: "Refugees and asylees"
  },
  {
    name: "Brooklyn Workforce Innovations",
    address: "9 Bond Street, Brooklyn, NY 11201",
    phone: "(718) 246-5219",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.bwinyc.org",
    category: "employment",
    description: "Job readiness training, employment placement, and career counseling for low-income adults.",
    languages: ["English", "Spanish"],
    eligibility: "NYC residents seeking employment"
  },
  {
    name: "Fedcap Employment Services",
    address: "633 Third Avenue, 6th Floor, New York, NY 10017",
    phone: "(212) 727-4200",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.fedcap.org",
    category: "employment",
    description: "Vocational training, job placement, and career advancement programs.",
    languages: ["English", "Spanish"],
    eligibility: "NYC residents, focus on barriers to employment"
  },
  {
    name: "Opportunities for a Better Tomorrow (OBT)",
    address: "39 Broadway, 14th Floor, New York, NY 10006",
    phone: "(212) 889-7343",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.obtjobs.org",
    category: "employment",
    description: "Job training, placement services, and career coaching for underemployed New Yorkers.",
    languages: ["English", "Spanish"],
    eligibility: "NYC residents seeking employment"
  },

  // EDUCATION SERVICES
  {
    name: "CUNY Adult Literacy Program",
    address: "Multiple CUNY campuses citywide",
    phone: "(212) 650-7925",
    hours: "Varies by location",
    website: "https://www.cuny.edu/academics/programs/notable-programs/adult-literacy",
    category: "education",
    description: "Free adult basic education, GED preparation, ESL classes, and college readiness programs.",
    languages: ["English", "Spanish", "Chinese", "Russian"],
    eligibility: "Adults 18+ who are NYC residents"
  },
  {
    name: "Brooklyn Public Library - Adult Learning Center",
    address: "280 Cadman Plaza West, Brooklyn, NY 11201",
    phone: "(718) 623-7000",
    hours: "Mon-Fri 9AM-8PM",
    website: "https://www.bklynlibrary.org/adulted",
    category: "education",
    description: "Free ESL classes, literacy programs, computer training, and citizenship prep.",
    languages: ["English", "Spanish", "Chinese", "Russian", "Arabic"],
    eligibility: "NYC adults"
  },
  {
    name: "New York Public Library - Adult Learning Centers",
    address: "Multiple locations across Manhattan, Bronx, Staten Island",
    phone: "(917) 275-6975",
    hours: "Varies by location",
    website: "https://www.nypl.org/education/adults",
    category: "education",
    description: "Free ESL, ESOL, literacy, GED prep, and digital literacy classes.",
    languages: ["English", "Spanish", "Chinese"],
    eligibility: "Adults 18+"
  },
  {
    name: "Literacy Assistance Center",
    address: "85 Broad Street, 27th Floor, New York, NY 10004",
    phone: "(212) 803-3333",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.lacnyc.org",
    category: "education",
    description: "Free adult education programs including ESL, ABE, GED, and workforce training.",
    languages: ["English", "Spanish"],
    eligibility: "NYC adults"
  },

  // FOOD ASSISTANCE
  {
    name: "Food Bank For New York City",
    address: "39 Broadway, 10th Floor, New York, NY 10006",
    phone: "(212) 566-7855",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.foodbanknyc.org",
    category: "food",
    description: "Emergency food assistance, meal programs, SNAP enrollment, and connections to food pantries citywide.",
    languages: ["English", "Spanish"],
    eligibility: "All NYC residents in need"
  },
  {
    name: "City Harvest",
    address: "6 East 32nd Street, 10th Floor, New York, NY 10016",
    phone: "(646) 412-0600",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.cityharvest.org",
    category: "food",
    description: "Food rescue and distribution to soup kitchens, food pantries, and community partners.",
    languages: ["English", "Spanish"],
    eligibility: "Through partner organizations"
  },
  {
    name: "God's Love We Deliver",
    address: "166 Avenue of the Americas, New York, NY 10013",
    phone: "(212) 294-8100",
    hours: "Mon-Fri 8AM-6PM",
    website: "https://www.godslovewedeliver.org",
    category: "food",
    description: "Free home-delivered meals for people living with serious illnesses.",
    languages: ["English", "Spanish"],
    eligibility: "NYC residents with serious illness"
  },
  {
    name: "New York Common Pantry",
    address: "8 East 109th Street, New York, NY 10029",
    phone: "(917) 720-9700",
    hours: "Mon, Wed, Fri 9AM-2PM",
    website: "https://www.nycommonpantry.org",
    category: "food",
    description: "Emergency food pantry providing groceries and cooked meals to families in need.",
    languages: ["English", "Spanish"],
    eligibility: "All NYC residents"
  },

  // LANGUAGE SERVICES
  {
    name: "Interfaith Center of New York - ESL",
    address: "40 Broad Street, Suite 1600, New York, NY 10004",
    phone: "(212) 870-3510",
    hours: "Mon-Fri 9AM-6PM",
    website: "https://www.interfaithcenter.org",
    category: "language",
    description: "Free ESL classes for all levels and cultural orientation programs for new immigrants.",
    languages: ["English", "Spanish", "Arabic", "French"],
    eligibility: "Adult immigrants and refugees"
  },
  {
    name: "YMCA of Greater New York - ESL Classes",
    address: "Multiple locations citywide",
    phone: "(212) 630-9600",
    hours: "Varies by location",
    website: "https://www.ymcanyc.org",
    category: "language",
    description: "English language classes, citizenship preparation, and workforce development.",
    languages: ["English", "Spanish", "Chinese"],
    eligibility: "All adults"
  },
  {
    name: "Catholic Charities - English Language Programs",
    address: "1011 First Avenue, New York, NY 10022",
    phone: "(212) 419-3700",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://catholiccharitiesny.org",
    category: "language",
    description: "ESL classes and English conversation groups for immigrants.",
    languages: ["English", "Spanish", "Arabic"],
    eligibility: "Immigrants and refugees"
  },

  // MENTAL HEALTH SERVICES
  {
    name: "NYC Well",
    address: "New York, NY (Call, Text, or Chat)",
    phone: "1-888-692-9355",
    hours: "24/7",
    website: "https://nycwell.cityofnewyork.us",
    category: "mental health",
    description: "Free, confidential mental health support via phone, text, or chat. Available in over 200 languages.",
    languages: ["200+ languages via interpretation"],
    eligibility: "All NYC residents"
  },
  {
    name: "NAMI NYC (National Alliance on Mental Illness)",
    address: "505 8th Avenue, Suite 1902, New York, NY 10018",
    phone: "(212) 684-3264",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.naminycmetro.org",
    category: "mental health",
    description: "Mental health support, education programs, peer support groups, and advocacy services.",
    languages: ["English", "Spanish"],
    eligibility: "All NYC residents"
  },
  {
    name: "The Door - Mental Health Services",
    address: "121 Avenue of the Americas, New York, NY 10013",
    phone: "(212) 941-9090",
    hours: "Mon-Fri 9AM-9PM, Sat 9AM-5PM",
    website: "https://www.door.org",
    category: "mental health",
    description: "Free mental health counseling, crisis intervention, and support groups for youth and young adults.",
    languages: ["English", "Spanish"],
    eligibility: "Youth ages 12-24"
  },
  {
    name: "Samaritan Daytop Village",
    address: "138-02 Queens Boulevard, Briarwood, NY 11435",
    phone: "(718) 206-2000",
    hours: "24/7 Hotline",
    website: "https://www.samaritanvillage.org",
    category: "mental health",
    description: "Substance abuse treatment, mental health services, and recovery support programs.",
    languages: ["English", "Spanish"],
    eligibility: "NYC residents with substance use disorders"
  },

  // CHILDCARE SERVICES
  {
    name: "NYC Child Care Connect",
    address: "Referral service for citywide programs",
    phone: "(888) 469-5999",
    hours: "Mon-Fri 8AM-6PM",
    website: "https://www.nycchildcareconnect.org",
    category: "childcare",
    description: "Free referrals to licensed childcare programs and information about subsidies.",
    languages: ["English", "Spanish", "Chinese", "Russian", "Bengali"],
    eligibility: "All NYC families"
  },
  {
    name: "YMCA of Greater New York - Childcare",
    address: "Multiple locations citywide",
    phone: "(212) 630-9600",
    hours: "Varies by location",
    website: "https://www.ymcanyc.org/programs/child-care",
    category: "childcare",
    description: "Affordable childcare, after-school programs, and summer camps.",
    languages: ["English", "Spanish"],
    eligibility: "NYC families, sliding scale fees"
  },
  {
    name: "Child Center of NY",
    address: "40-19 Ithaca Street, Elmhurst, NY 11373",
    phone: "(718) 651-7770",
    hours: "Mon-Fri 8AM-6PM",
    website: "https://www.childcenterny.org",
    category: "childcare",
    description: "Early childhood education, family support services, and developmental screenings.",
    languages: ["English", "Spanish", "Chinese", "Bengali"],
    eligibility: "NYC families with children 0-5"
  },

  // ADDITIONAL SPECIALIZED SERVICES
  {
    name: "Sanctuary for Families",
    address: "P.O. Box 1406, Wall Street Station, New York, NY 10268",
    phone: "(212) 349-6009",
    hours: "24/7 Hotline",
    website: "https://www.sanctuaryforfamilies.org",
    category: "legal",
    description: "Services for survivors of domestic violence including legal help, counseling, and emergency shelter.",
    languages: ["English", "Spanish", "Chinese", "Arabic"],
    eligibility: "Survivors of domestic violence and trafficking"
  },
  {
    name: "Arab-American Family Support Center",
    address: "150 Court Street, 3rd Floor, Brooklyn, NY 11201",
    phone: "(718) 643-8000",
    hours: "Mon-Fri 9AM-6PM",
    website: "https://www.aafscny.org",
    category: "education",
    description: "ESL, job training, youth programs, legal services, and mental health support for Arab immigrants.",
    languages: ["English", "Arabic"],
    eligibility: "Arab immigrants and refugees"
  },
  {
    name: "African Services Committee",
    address: "429 West 127th Street, New York, NY 10027",
    phone: "(212) 222-3882",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.africanservices.org",
    category: "healthcare",
    description: "HIV/AIDS services, immigration support, mental health counseling for African immigrants.",
    languages: ["English", "French", "Wolof", "Bambara"],
    eligibility: "African immigrants"
  },
  {
    name: "Make the Road New York",
    address: "301 Grove Street, Brooklyn, NY 11237",
    phone: "(718) 418-7690",
    hours: "Mon-Fri 9AM-6PM",
    website: "https://www.maketheroadny.org",
    category: "legal",
    description: "Immigration legal services, workers' rights, tenant organizing, and education programs.",
    languages: ["English", "Spanish"],
    eligibility: "Low-income immigrants"
  },
  {
    name: "New York Immigration Coalition",
    address: "131 West 33rd Street, Suite 610, New York, NY 10001",
    phone: "(212) 627-2227",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.nyic.org",
    category: "legal",
    description: "Policy advocacy, immigrant resource directory, and referrals to member organizations.",
    languages: ["English", "Spanish"],
    eligibility: "All immigrants"
  },
  {
    name: "Catholic Migration Services",
    address: "191 Joralemon Street, Brooklyn, NY 11201",
    phone: "(718) 236-3000",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://catholicmigration.org",
    category: "legal",
    description: "Immigration legal services, citizenship classes, and family reunification assistance.",
    languages: ["English", "Spanish", "Arabic", "Chinese"],
    eligibility: "Low-income immigrants"
  },
  {
    name: "Hellenic American Neighborhood Action Committee (HANAC)",
    address: "31-12 31st Avenue, Astoria, NY 11106",
    phone: "(718) 204-3100",
    hours: "Mon-Fri 9AM-5PM",
    website: "https://www.hanac.org",
    category: "education",
    description: "ESL classes, workforce development, senior services, and youth programs.",
    languages: ["English", "Greek", "Spanish"],
    eligibility: "All NYC residents"
  }
];
