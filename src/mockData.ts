// mockData.ts - Place this in your src folder
export interface MockResource {
    id: string;
    name: string;
    address: string;
    phone: string;
    hours: string;
    website: string;
    category: string;
    description: string;
    lat?: number;
    lng?: number;
    source: string;
  }
  
  export const mockDatabase: MockResource[] = [
    // MENTAL HEALTH SERVICES
    {
      id: "mock-mh-1",
      name: "NYC Well - Mental Health Support",
      address: "New York, NY (Call, Text, or Chat)",
      phone: "1-888-692-9355",
      hours: "24/7",
      website: "https://nycwell.cityofnewyork.us",
      category: "mental health",
      description: "Free, confidential mental health support via phone, text, or chat. Available 24/7 in over 200 languages.",
      source: "mock_data"
    },
    {
      id: "mock-mh-2",
      name: "NAMI NYC (National Alliance on Mental Illness)",
      address: "505 8th Avenue, Suite 1902, New York, NY 10018",
      phone: "(212) 684-3264",
      hours: "Mon-Fri: 9AM-5PM",
      website: "https://www.naminycmetro.org",
      category: "mental health",
      description: "Mental health support, education programs, peer support groups, and advocacy services for individuals and families.",
      lat: 40.7543,
      lng: -73.9904,
      source: "mock_data"
    },
    {
      id: "mock-mh-3",
      name: "The Institute for Family Health - Behavioral Health",
      address: "16 East 16th Street, New York, NY 10003",
      phone: "(212) 633-0800",
      hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-5PM",
      website: "https://www.institute.org",
      category: "mental health",
      description: "Comprehensive mental health services including counseling, therapy, and psychiatric care. Accepts Medicaid and offers sliding scale fees.",
      lat: 40.7365,
      lng: -73.9918,
      source: "mock_data"
    },
    {
      id: "mock-mh-4",
      name: "Project Renewal - Mental Health Services",
      address: "200 Varick Street, 9th Floor, New York, NY 10014",
      phone: "(212) 620-0340",
      hours: "Mon-Fri: 9AM-5PM",
      website: "https://www.projectrenewal.org",
      category: "mental health",
      description: "Mental health services for homeless and formerly homeless individuals, including trauma-informed care and substance abuse support.",
      lat: 40.7277,
      lng: -74.0056,
      source: "mock_data"
    },
  
    // HOUSING SERVICES
    {
      id: "mock-housing-1",
      name: "HomeBase - Bronx",
      address: "1130 Grand Concourse, Bronx, NY 10456",
      phone: "(718) 731-4590",
      hours: "Mon-Fri: 9AM-5PM",
      website: "https://www1.nyc.gov/site/hra/help/homebase.page",
      category: "housing",
      description: "Free homelessness prevention services including rental assistance, legal services, and crisis intervention for families and individuals.",
      lat: 40.8319,
      lng: -73.9190,
      source: "mock_data"
    },
    {
      id: "mock-housing-2",
      name: "Coalition for the Homeless",
      address: "129 Fulton Street, New York, NY 10038",
      phone: "(212) 776-2000",
      hours: "Mon-Fri: 9AM-5PM",
      website: "https://www.coalitionforthehomeless.org",
      category: "housing",
      description: "Emergency shelter placement, eviction prevention, housing assistance programs, and advocacy for homeless New Yorkers.",
      lat: 40.7105,
      lng: -74.0048,
      source: "mock_data"
    },
    {
      id: "mock-housing-3",
      name: "Breaking Ground",
      address: "505 Eighth Avenue, Suite 1500, New York, NY 10018",
      phone: "(212) 389-9300",
      hours: "Mon-Fri: 9AM-6PM",
      website: "https://breakingground.org",
      category: "housing",
      description: "Supportive housing for homeless individuals and families, including case management, mental health services, and job training.",
      lat: 40.7542,
      lng: -73.9905,
      source: "mock_data"
    },
  
    // HEALTHCARE SERVICES
    {
      id: "mock-health-1",
      name: "Charles B. Wang Community Health Center",
      address: "268 Canal Street, New York, NY 10013",
      phone: "(212) 379-6988",
      hours: "Mon-Fri: 8AM-8PM, Sat: 9AM-5PM",
      website: "https://www.cbwchc.org",
      category: "healthcare",
      description: "Multilingual primary care, dental, mental health, and social services. Accepts Medicaid, Medicare, and uninsured patients.",
      lat: 40.7189,
      lng: -73.9989,
      source: "mock_data"
    },
    {
      id: "mock-health-2",
      name: "Ryan Health - Frederick Douglass",
      address: "2238 Fifth Avenue, New York, NY 10037",
      phone: "(212) 749-1820",
      hours: "Mon-Fri: 8AM-7PM, Sat: 9AM-3PM",
      website: "https://www.ryanhealth.org",
      category: "healthcare",
      description: "Comprehensive primary care, pediatrics, women's health, dental, and behavioral health services. Sliding fee scale available.",
      lat: 40.8075,
      lng: -73.9395,
      source: "mock_data"
    },
    {
      id: "mock-health-3",
      name: "NYC Health + Hospitals/Bellevue",
      address: "462 First Avenue, New York, NY 10016",
      phone: "(212) 562-4141",
      hours: "24/7 Emergency Care",
      website: "https://www.nychealthandhospitals.org/bellevue",
      category: "healthcare",
      description: "Full-service hospital with multilingual staff, specialized refugee health program, and financial assistance for uninsured patients.",
      lat: 40.7390,
      lng: -73.9754,
      source: "mock_data"
    },
  
    // LEGAL AID SERVICES
    {
      id: "mock-legal-1",
      name: "The Legal Aid Society - Immigration Law Unit",
      address: "199 Water Street, New York, NY 10038",
      phone: "(212) 577-3300",
      hours: "Mon-Fri: 9AM-5PM",
      website: "https://www.legalaidnyc.org",
      category: "legal",
      description: "Free legal representation for immigration, asylum, deportation defense, family law, and housing matters.",
      lat: 40.7065,
      lng: -74.0047,
      source: "mock_data"
    },
    {
      id: "mock-legal-2",
      name: "New York Legal Assistance Group (NYLAG)",
      address: "7 Hanover Square, 18th Floor, New York, NY 10004",
      phone: "(212) 613-5000",
      hours: "Mon-Fri: 9AM-6PM",
      website: "https://nylag.org",
      category: "legal",
      description: "Free immigration law services, housing rights advocacy, family law assistance, and consumer protection for low-income New Yorkers.",
      lat: 40.7047,
      lng: -74.0095,
      source: "mock_data"
    },
    {
      id: "mock-legal-3",
      name: "Safe Horizon - Immigration Law Project",
      address: "2 Lafayette Street, 3rd Floor, New York, NY 10007",
      phone: "(212) 577-7700",
      hours: "Mon-Fri: 9AM-5PM",
      website: "https://www.safehorizon.org",
      category: "legal",
      description: "Free legal services for immigrant survivors of domestic violence, human trafficking, and other crimes. VAWA and U-Visa assistance.",
      lat: 40.7142,
      lng: -74.0024,
      source: "mock_data"
    },
  
    // EMPLOYMENT SERVICES
    {
      id: "mock-employ-1",
      name: "International Rescue Committee (IRC) NYC",
      address: "122 East 42nd Street, New York, NY 10168",
      phone: "(212) 377-4728",
      hours: "Mon-Fri: 8AM-5PM",
      website: "https://www.rescue.org/united-states/new-york-city",
      category: "employment",
      description: "Job training, resume help, ESL classes, career counseling, and resettlement services for refugees and asylum seekers.",
      lat: 40.7516,
      lng: -73.9771,
      source: "mock_data"
    },
    {
      id: "mock-employ-2",
      name: "NYC Small Business Services - Workforce1 Career Centers",
      address: "Multiple locations citywide",
      phone: "(718) 557-6755",
      hours: "Mon-Fri: 9AM-5PM",
      website: "https://www1.nyc.gov/site/sbs/careers/workforce1-career-centers.page",
      category: "employment",
      description: "Free job search assistance, skills training, resume workshops, interview prep, and connections to employers hiring now.",
      source: "mock_data"
    },
    {
      id: "mock-employ-3",
      name: "Opportunities for a Better Tomorrow (OBT)",
      address: "43-06 Ditmars Boulevard, Queens, NY 11105",
      phone: "(718) 728-5400",
      hours: "Mon-Fri: 9AM-6PM",
      website: "https://www.obtjobs.org",
      category: "employment",
      description: "Vocational training, job placement, financial literacy, and adult education for immigrants and low-income individuals.",
      lat: 40.7737,
      lng: -73.9092,
      source: "mock_data"
    },
  
    // EDUCATION SERVICES
    {
      id: "mock-edu-1",
      name: "CUNY Adult Literacy Program",
      address: "Multiple CUNY campuses citywide",
      phone: "(212) 650-7925",
      hours: "Varies by location",
      website: "https://www.cuny.edu/academics/programs/notable-programs/adult-literacy",
      category: "education",
      description: "Free adult basic education, GED preparation, ESL classes, and college readiness programs at CUNY colleges across NYC.",
      source: "mock_data"
    },
    {
      id: "mock-edu-2",
      name: "New York Public Library - Adult Learning Centers",
      address: "Multiple library locations citywide",
      phone: "(212) 340-0833",
      hours: "Varies by location",
      website: "https://www.nypl.org/education/adults",
      category: "education",
      description: "Free ESL classes, computer skills training, career resources, GED preparation, and literacy programs at library branches.",
      source: "mock_data"
    },
    {
      id: "mock-edu-3",
      name: "Bronx Community College - Adult and Continuing Education",
      address: "2155 University Avenue, Bronx, NY 10453",
      phone: "(718) 289-5100",
      hours: "Mon-Thu: 9AM-8PM, Fri: 9AM-5PM",
      website: "https://www.bcc.cuny.edu/campus-resources/adult-continuing-education",
      category: "education",
      description: "Workforce training, ESL classes, GED preparation, vocational certificates, and college preparation courses.",
      lat: 40.8566,
      lng: -73.9108,
      source: "mock_data"
    },
  
    // FOOD ASSISTANCE
    {
      id: "mock-food-1",
      name: "Food Bank For New York City",
      address: "39 Broadway, 10th Floor, New York, NY 10006",
      phone: "(212) 566-7855",
      hours: "Mon-Fri: 9AM-5PM",
      website: "https://www.foodbanknyc.org",
      category: "food",
      description: "Emergency food assistance, meal programs, nutrition education, and connections to food pantries and soup kitchens citywide.",
      lat: 40.7074,
      lng: -74.0125,
      source: "mock_data"
    },
    {
      id: "mock-food-2",
      name: "City Harvest Mobile Markets",
      address: "Multiple locations throughout NYC",
      phone: "(646) 412-0600",
      hours: "Varies by location",
      website: "https://www.cityharvest.org/mobile-markets",
      category: "food",
      description: "Free fresh fruits, vegetables, and groceries distributed at mobile markets across all five boroughs. No registration required.",
      source: "mock_data"
    },
    {
      id: "mock-food-3",
      name: "SNAP (Food Stamps) - ACCESS HRA",
      address: "Apply online or at HRA centers citywide",
      phone: "311",
      hours: "24/7 online application",
      website: "https://www1.nyc.gov/site/hra/help/snap-benefits-food-program.page",
      category: "food",
      description: "Monthly food assistance benefits for eligible low-income individuals and families. Apply online or at local HRA offices.",
      source: "mock_data"
    },
  
    // LANGUAGE SERVICES
    {
      id: "mock-lang-1",
      name: "The Interfaith Center of New York - ESL Classes",
      address: "40 Broad Street, Suite 1600, New York, NY 10004",
      phone: "(212) 870-3510",
      hours: "Mon-Fri: 9AM-6PM",
      website: "https://www.interfaithcenter.org",
      category: "language",
      description: "Free ESL classes for all levels, cultural orientation programs, and community integration support for immigrants and refugees.",
      lat: 40.7058,
      lng: -74.0113,
      source: "mock_data"
    },
    {
      id: "mock-lang-2",
      name: "Brooklyn Public Library - ESL Programs",
      address: "Multiple library locations in Brooklyn",
      phone: "(718) 230-2100",
      hours: "Varies by location",
      website: "https://www.bklynlibrary.org/learn/esl",
      category: "language",
      description: "Free English conversation groups, ESL classes for all levels, citizenship preparation, and language learning resources.",
      source: "mock_data"
    },
    {
      id: "mock-lang-3",
      name: "YMCA of Greater New York - Adult ESL",
      address: "Multiple YMCA locations citywide",
      phone: "(212) 630-9600",
      hours: "Varies by location",
      website: "https://ymcanyc.org/programs/education/adult-learning",
      category: "language",
      description: "Affordable ESL classes, computer literacy training, and workforce development programs at YMCA branches across NYC.",
      source: "mock_data"
    },
  
    // CHILDCARE SERVICES
    {
      id: "mock-child-1",
      name: "NYC Department of Education - 3-K and Pre-K",
      address: "Citywide enrollment",
      phone: "311",
      hours: "Mon-Fri: 8AM-6PM",
      website: "https://www.schools.nyc.gov/enrollment/enroll-grade-by-grade/3k",
      category: "childcare",
      description: "Free, full-day, high-quality early childhood education for 3 and 4-year-olds at schools and community-based organizations.",
      source: "mock_data"
    },
    {
      id: "mock-child-2",
      name: "Children's Aid - Early Childhood Programs",
      address: "Multiple locations in Manhattan, Bronx, and Brooklyn",
      phone: "(212) 949-4800",
      hours: "Mon-Fri: 7:30AM-6PM",
      website: "https://www.childrensaidnyc.org/programs/early-childhood",
      category: "childcare",
      description: "High-quality childcare, early education, and family support services. Subsidies available for eligible families.",
      source: "mock_data"
    },
    {
      id: "mock-child-3",
      name: "NYC Child Care Connect",
      address: "Referral service for citywide programs",
      phone: "(888) 469-5999",
      hours: "Mon-Fri: 8AM-6PM",
      website: "https://www.nycchildcareconnect.org",
      category: "childcare",
      description: "Free referrals to licensed childcare programs, information on subsidies and vouchers, and support finding quality care.",
      source: "mock_data"
    }
  ];
  
  // Search function
  export function searchMockData(
    query: string,
    category: string = 'all',
    maxResults: number = 10
  ): MockResource[] {
    const queryLower = query.toLowerCase();
    const categoryLower = category.toLowerCase();
  
    let results = mockDatabase.filter(resource => {
      const matchesQuery = 
        resource.name.toLowerCase().includes(queryLower) ||
        resource.description.toLowerCase().includes(queryLower) ||
        resource.category.toLowerCase().includes(queryLower);
      
      const matchesCategory = categoryLower === 'all' || 
        resource.category.toLowerCase() === categoryLower;
      
      return matchesQuery && matchesCategory;
    });
  
    if (results.length === 0 && categoryLower !== 'all') {
      results = mockDatabase.filter(resource => 
        resource.category.toLowerCase() === categoryLower
      );
    }
  
    return results.slice(0, maxResults);
  }