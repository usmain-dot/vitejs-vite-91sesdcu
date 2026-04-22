import React, { useState, useMemo } from 'react';
import { GraduationCap, MapPin, Phone, Globe } from 'lucide-react';

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
  // ─── UNIVERSITIES (existing) ───────────────────────────────────────────────
  { id: 1, name: 'New York University (NYU)', type: 'university', borough: 'Manhattan', address: '70 Washington Square S, New York, NY 10012', phone: '(212) 998-1212', website: 'https://www.nyu.edu', languages: ['English'], description: 'Private research university with programs in arts, sciences, business, and law.', grades: 'Undergraduate & Graduate' },
  { id: 2, name: 'Columbia University', type: 'university', borough: 'Manhattan', address: '116th St & Broadway, New York, NY 10027', phone: '(212) 854-1754', website: 'https://www.columbia.edu', languages: ['English'], description: 'Ivy League research university offering undergraduate and graduate programs.', grades: 'Undergraduate & Graduate' },
  { id: 3, name: 'City College of New York (CCNY)', type: 'university', borough: 'Manhattan', address: '160 Convent Ave, New York, NY 10031', phone: '(212) 650-7000', website: 'https://www.ccny.cuny.edu', languages: ['English', 'Spanish'], description: 'CUNY flagship college offering affordable education in engineering, arts, and sciences.', grades: 'Undergraduate & Graduate' },
  { id: 4, name: 'Brooklyn College', type: 'university', borough: 'Brooklyn', address: '2900 Bedford Ave, Brooklyn, NY 11210', phone: '(718) 951-5000', website: 'https://www.brooklyn.cuny.edu', languages: ['English', 'Spanish'], description: 'CUNY liberal arts college with strong programs in business, education, and arts.', grades: 'Undergraduate & Graduate' },
  { id: 5, name: 'Queens College', type: 'university', borough: 'Queens', address: '65-30 Kissena Blvd, Queens, NY 11367', phone: '(718) 997-5000', website: 'https://www.qc.cuny.edu', languages: ['English', 'Spanish', 'Chinese'], description: 'CUNY college offering diverse programs with strong ESL support for immigrants.', grades: 'Undergraduate & Graduate' },
  { id: 6, name: 'Lehman College', type: 'university', borough: 'Bronx', address: '250 Bedford Park Blvd W, Bronx, NY 10468', phone: '(718) 960-8000', website: 'https://www.lehman.cuny.edu', languages: ['English', 'Spanish'], description: 'CUNY college serving the Bronx with strong bilingual and immigrant support programs.', grades: 'Undergraduate & Graduate' },
  { id: 7, name: 'College of Staten Island', type: 'university', borough: 'Staten Island', address: '2800 Victory Blvd, Staten Island, NY 10314', phone: '(718) 982-2000', website: 'https://www.csi.cuny.edu', languages: ['English'], description: 'CUNY college offering undergraduate and graduate programs on Staten Island.', grades: 'Undergraduate & Graduate' },
  { id: 8, name: 'Fordham University', type: 'university', borough: 'Bronx', address: '441 E Fordham Rd, Bronx, NY 10458', phone: '(718) 817-1000', website: 'https://www.fordham.edu', languages: ['English', 'Spanish'], description: 'Jesuit research university with programs in business, law, and social services.', grades: 'Undergraduate & Graduate' },

  // ─── UNIVERSITIES (new) ────────────────────────────────────────────────────
  { id: 28, name: 'The Juilliard School', type: 'university', borough: 'Manhattan', address: '60 Lincoln Center Plaza, New York, NY 10023', phone: '(212) 799-5000', website: 'https://www.juilliard.edu', languages: ['English'], description: 'World-renowned performing arts conservatory offering programs in music, dance, and drama.', grades: 'Undergraduate & Graduate' },
  { id: 29, name: 'Pace University', type: 'university', borough: 'Manhattan', address: '1 Pace Plaza, New York, NY 10038', phone: '(212) 346-1200', website: 'https://www.pace.edu', languages: ['English'], description: 'Private university with programs in business, arts, sciences, and health professions.', grades: 'Undergraduate & Graduate' },
  { id: 30, name: 'The New School', type: 'university', borough: 'Manhattan', address: '66 W 12th St, New York, NY 10011', phone: '(212) 229-5600', website: 'https://www.newschool.edu', languages: ['English'], description: 'Progressive university known for design, social sciences, liberal arts, and performing arts.', grades: 'Undergraduate & Graduate' },
  { id: 31, name: 'Baruch College (CUNY)', type: 'university', borough: 'Manhattan', address: '55 Lexington Ave, New York, NY 10010', phone: '(646) 312-1000', website: 'https://www.baruch.cuny.edu', languages: ['English', 'Spanish'], description: 'CUNY college renowned for business, public affairs, and communication programs.', grades: 'Undergraduate & Graduate' },
  { id: 32, name: 'Hunter College (CUNY)', type: 'university', borough: 'Manhattan', address: '695 Park Ave, New York, NY 10065', phone: '(212) 772-4000', website: 'https://www.hunter.cuny.edu', languages: ['English', 'Spanish'], description: 'CUNY college offering liberal arts, sciences, nursing, and social work programs.', grades: 'Undergraduate & Graduate' },
  { id: 33, name: 'John Jay College of Criminal Justice (CUNY)', type: 'university', borough: 'Manhattan', address: '524 W 59th St, New York, NY 10019', phone: '(212) 237-8000', website: 'https://www.jjay.cuny.edu', languages: ['English', 'Spanish'], description: 'CUNY college specializing in criminal justice, law, forensic science, and public policy.', grades: 'Undergraduate & Graduate' },
  { id: 34, name: 'Fashion Institute of Technology (FIT)', type: 'university', borough: 'Manhattan', address: '227 W 27th St, New York, NY 10001', phone: '(212) 217-7999', website: 'https://www.fitnyc.edu', languages: ['English'], description: 'SUNY college specializing in fashion design, business, art, and communications.', grades: 'Undergraduate & Graduate' },
  { id: 35, name: 'Pratt Institute', type: 'university', borough: 'Brooklyn', address: '200 Willoughby Ave, Brooklyn, NY 11205', phone: '(718) 636-3600', website: 'https://www.pratt.edu', languages: ['English'], description: 'Leading private art and design college with programs in architecture, fine arts, and design.', grades: 'Undergraduate & Graduate' },
  { id: 36, name: 'School of Visual Arts (SVA)', type: 'university', borough: 'Manhattan', address: '209 E 23rd St, New York, NY 10010', phone: '(212) 592-2000', website: 'https://www.sva.edu', languages: ['English'], description: 'Private college for visual arts offering programs in illustration, photography, film, and design.', grades: 'Undergraduate & Graduate' },
  { id: 37, name: 'Yeshiva University', type: 'university', borough: 'Manhattan', address: '500 W 185th St, New York, NY 10033', phone: '(212) 960-5400', website: 'https://www.yu.edu', languages: ['English', 'Hebrew'], description: 'Private Jewish university offering programs in liberal arts, sciences, business, and law.', grades: 'Undergraduate & Graduate' },
  { id: 38, name: "St. John's University", type: 'university', borough: 'Queens', address: '8000 Utopia Pkwy, Queens, NY 11439', phone: '(718) 990-6161', website: 'https://www.stjohns.edu', languages: ['English', 'Spanish'], description: 'Catholic university offering programs in business, law, pharmacy, and liberal arts.', grades: 'Undergraduate & Graduate' },

  // ─── COMMUNITY COLLEGES (existing) ────────────────────────────────────────
  { id: 9, name: 'Borough of Manhattan Community College', type: 'college', borough: 'Manhattan', address: '199 Chambers St, New York, NY 10007', phone: '(212) 220-8000', website: 'https://www.bmcc.cuny.edu', languages: ['English', 'Spanish', 'Chinese'], description: 'Affordable 2-year CUNY college with strong ESL and immigrant support programs.', grades: 'Associate Degrees' },
  { id: 10, name: 'Bronx Community College', type: 'college', borough: 'Bronx', address: '2155 University Ave, Bronx, NY 10453', phone: '(718) 289-5100', website: 'https://www.bcc.cuny.edu', languages: ['English', 'Spanish'], description: '2-year CUNY college serving the Bronx community with workforce development programs.', grades: 'Associate Degrees' },
  { id: 11, name: 'Queensborough Community College', type: 'college', borough: 'Queens', address: '222-05 56th Ave, Bayside, NY 11364', phone: '(718) 631-6262', website: 'https://www.qcc.cuny.edu', languages: ['English', 'Spanish', 'Chinese'], description: '2-year CUNY college with strong ESL programs and workforce training.', grades: 'Associate Degrees' },
  { id: 12, name: 'Kingsborough Community College', type: 'college', borough: 'Brooklyn', address: '2001 Oriental Blvd, Brooklyn, NY 11235', phone: '(718) 265-5343', website: 'https://www.kbcc.cuny.edu', languages: ['English', 'Spanish', 'Russian'], description: '2-year CUNY college with ESL programs and career training for new immigrants.', grades: 'Associate Degrees' },

  // ─── HIGH SCHOOLS (existing specialized public) ────────────────────────────
  { id: 13, name: 'Stuyvesant High School', type: 'high school', borough: 'Manhattan', address: '345 Chambers St, New York, NY 10282', phone: '(212) 312-4800', website: 'https://stuy.enschool.org', languages: ['English'], description: 'Specialized public high school known for excellence in math and science.', grades: '9-12' },
  { id: 14, name: 'Bronx High School of Science', type: 'high school', borough: 'Bronx', address: '75 W 205th St, Bronx, NY 10468', phone: '(718) 817-7700', website: 'https://www.bxscience.edu', languages: ['English'], description: 'Specialized public high school focused on science, math, and technology.', grades: '9-12' },
  { id: 15, name: 'Brooklyn Technical High School', type: 'high school', borough: 'Brooklyn', address: '29 Fort Greene Pl, Brooklyn, NY 11217', phone: '(718) 804-6400', website: 'https://www.bths.edu', languages: ['English'], description: 'Specialized public high school with programs in engineering and technology.', grades: '9-12' },
  { id: 16, name: 'International High School at Prospect Heights', type: 'high school', borough: 'Brooklyn', address: '883 Classon Ave, Brooklyn, NY 11225', phone: '(718) 230-6750', website: 'https://www.ihsph.org', languages: ['English', 'Spanish', 'Arabic', 'French'], description: 'Public high school specifically designed for recent immigrant students.', grades: '9-12' },
  { id: 17, name: 'International High School at Lafayette', type: 'high school', borough: 'Brooklyn', address: '2630 Benson Ave, Brooklyn, NY 11214', phone: '(718) 714-4660', website: 'https://www.ihslafayette.org', languages: ['English', 'Spanish', 'Arabic', 'Chinese'], description: 'High school dedicated to serving recent immigrant students with multilingual support.', grades: '9-12' },
  { id: 18, name: 'Queens International High School', type: 'high school', borough: 'Queens', address: '74-20 Commonwealth Blvd, Queens, NY 11426', phone: '(718) 749-2040', website: 'https://www.queensinternational.org', languages: ['English', 'Spanish', 'Arabic', 'Chinese'], description: 'High school for recent immigrants with strong multilingual academic support.', grades: '9-12' },

  // ─── HIGH SCHOOLS (new – specialized public) ──────────────────────────────
  { id: 39, name: 'Queens High School for the Sciences at York College', type: 'high school', borough: 'Queens', address: '94-50 159th St, Jamaica, NY 11433', phone: '(718) 657-3181', website: 'https://www.qhss.org', languages: ['English'], description: 'Specialized public high school for students with exceptional ability in science and math.', grades: '9-12' },
  { id: 40, name: 'Staten Island Technical High School', type: 'high school', borough: 'Staten Island', address: '485 Clawson St, Staten Island, NY 10306', phone: '(718) 667-3222', website: 'https://www.siths.org', languages: ['English'], description: 'Specialized public high school on Staten Island focusing on technology and sciences.', grades: '9-12' },
  { id: 41, name: 'High School of American Studies at Lehman College', type: 'high school', borough: 'Bronx', address: '2925 Goulden Ave, Bronx, NY 10468', phone: '(718) 329-2144', website: 'https://www.hsas-lehman.org', languages: ['English'], description: 'Selective public high school emphasizing American history, government, and humanities.', grades: '9-12' },
  { id: 42, name: 'Townsend Harris High School', type: 'high school', borough: 'Queens', address: '149-11 Melbourne Ave, Flushing, NY 11367', phone: '(718) 268-6800', website: 'https://www.townsendharris.org', languages: ['English'], description: 'Highly selective public high school affiliated with Queens College, known for academics.', grades: '9-12' },

  // ─── HIGH SCHOOLS (new – private/independent) ─────────────────────────────
  { id: 43, name: 'Trinity School', type: 'high school', borough: 'Manhattan', address: '139 W 91st St, New York, NY 10024', phone: '(212) 873-1650', website: 'https://www.trinityschoolnyc.org', languages: ['English'], description: 'Elite independent K-12 school with a rigorous college-prep curriculum on the Upper West Side.', grades: 'K-12' },
  { id: 44, name: 'Regis High School', type: 'high school', borough: 'Manhattan', address: '55 E 84th St, New York, NY 10028', phone: '(212) 288-1100', website: 'https://www.regis-nyc.org', languages: ['English'], description: 'Tuition-free Jesuit Catholic high school for academically gifted young men.', grades: '9-12' },
  { id: 45, name: 'Collegiate School', type: 'high school', borough: 'Manhattan', address: '260 W 78th St, New York, NY 10024', phone: '(212) 812-8500', website: 'https://www.collegiateschool.org', languages: ['English'], description: 'One of the oldest independent schools in the US; all-boys K-12 on the Upper West Side.', grades: 'K-12' },
  { id: 46, name: 'Horace Mann School', type: 'high school', borough: 'Bronx', address: '231 W 246th St, Bronx, NY 10471', phone: '(718) 432-4000', website: 'https://www.horacemann.org', languages: ['English'], description: 'Prestigious independent K-12 school known for academic excellence and college preparation.', grades: 'K-12' },
  { id: 47, name: 'Dalton School', type: 'high school', borough: 'Manhattan', address: '108 E 89th St, New York, NY 10128', phone: '(212) 423-5200', website: 'https://www.dalton.org', languages: ['English'], description: 'Renowned progressive independent K-12 school using the Dalton Plan for individualized learning.', grades: 'K-12' },
  { id: 48, name: 'Brearley School', type: 'high school', borough: 'Manhattan', address: '610 E 83rd St, New York, NY 10028', phone: '(212) 744-8582', website: 'https://www.brearley.org', languages: ['English'], description: 'Top-ranked independent girls K-12 school on the Upper East Side, emphasizing critical thinking.', grades: 'K-12' },
  { id: 49, name: 'Riverdale Country School', type: 'high school', borough: 'Bronx', address: '5250 Fieldston Rd, Bronx, NY 10471', phone: '(718) 549-8810', website: 'https://www.riverdale.edu', languages: ['English'], description: 'Co-ed independent K-12 school with a strong liberal arts and college-prep program.', grades: 'K-12' },
  { id: 50, name: 'Chapin School', type: 'high school', borough: 'Manhattan', address: '100 E End Ave, New York, NY 10028', phone: '(212) 744-2335', website: 'https://www.chapin.edu', languages: ['English'], description: 'All-girls independent K-12 school on the Upper East Side with a rigorous academic program.', grades: 'K-12' },
  { id: 51, name: 'Packer Collegiate Institute', type: 'high school', borough: 'Brooklyn', address: '170 Joralemon St, Brooklyn, NY 11201', phone: '(718) 250-0200', website: 'https://www.packer.edu', languages: ['English'], description: 'Independent co-ed PK-12 school in Brooklyn Heights with strong arts and academics.', grades: 'PK-12' },
  { id: 52, name: 'Poly Prep Country Day School', type: 'high school', borough: 'Brooklyn', address: '9216 7th Ave, Brooklyn, NY 11228', phone: '(718) 836-9800', website: 'https://www.polyprep.org', languages: ['English'], description: 'Co-ed independent K-12 school in Dyker Heights with strong athletics and academic programs.', grades: 'K-12' },
  { id: 53, name: 'Convent of the Sacred Heart', type: 'high school', borough: 'Manhattan', address: '1 E 91st St, New York, NY 10128', phone: '(212) 722-4745', website: 'https://www.cshnyc.org', languages: ['English'], description: "Independent Catholic girls' K-12 school on Carnegie Hill with a global mission focus.", grades: 'K-12' },
  { id: 54, name: 'Spence School', type: 'high school', borough: 'Manhattan', address: '22 E 91st St, New York, NY 10128', phone: '(212) 289-5940', website: 'https://www.spenceschool.org', languages: ['English'], description: "All-girls independent K-12 school on the Upper East Side known for leadership and academics.", grades: 'K-12' },
  { id: 55, name: 'Friends Seminary', type: 'high school', borough: 'Manhattan', address: '222 E 16th St, New York, NY 10003', phone: '(212) 477-9511', website: 'https://www.friendsseminary.org', languages: ['English'], description: 'Quaker co-ed K-12 school in Gramercy emphasizing community, integrity, and scholarship.', grades: 'K-12' },
  { id: 56, name: 'United Nations International School (UNIS)', type: 'high school', borough: 'Manhattan', address: '24-50 FDR Dr, New York, NY 10010', phone: '(212) 684-7400', website: 'https://www.unis.org', languages: ['English', 'French'], description: 'IB international school serving the UN community with students from over 120 countries.', grades: 'K-12' },
  { id: 57, name: 'Marymount School of New York', type: 'high school', borough: 'Manhattan', address: '1026 5th Ave, New York, NY 10028', phone: '(212) 744-4486', website: 'https://www.marymount.k12.ny.us', languages: ['English'], description: "Catholic independent girls' K-12 school on Fifth Avenue with strong academic and arts programs.", grades: 'K-12' },
  { id: 58, name: "Saint Ann's School", type: 'high school', borough: 'Brooklyn', address: '129 Pierrepont St, Brooklyn, NY 11201', phone: '(718) 522-1660', website: 'https://www.saintannsny.org', languages: ['English'], description: 'Arts-focused independent K-12 school in Brooklyn Heights that eschews grades and rankings.', grades: 'K-12' },
  { id: 59, name: 'Ethical Culture Fieldston School', type: 'high school', borough: 'Bronx', address: '3901 Fieldston Rd, Bronx, NY 10471', phone: '(718) 329-7300', website: 'https://www.ecfs.org', languages: ['English'], description: 'Progressive independent K-12 school rooted in ethical philosophy and social justice.', grades: 'K-12' },
  { id: 60, name: 'Columbia Grammar & Preparatory School', type: 'high school', borough: 'Manhattan', address: '5 W 93rd St, New York, NY 10025', phone: '(212) 749-6200', website: 'https://www.cgps.org', languages: ['English'], description: 'Co-ed independent PK-12 school on the Upper West Side with a strong college-prep focus.', grades: 'PK-12' },
  { id: 61, name: 'Berkeley Carroll School', type: 'high school', borough: 'Brooklyn', address: '181 Lincoln Pl, Brooklyn, NY 11217', phone: '(718) 789-6060', website: 'https://www.berkeleycarroll.org', languages: ['English'], description: 'Independent co-ed PK-12 school in Park Slope offering a rigorous and creative curriculum.', grades: 'PK-12' },
  { id: 62, name: 'Nightingale-Bamford School', type: 'high school', borough: 'Manhattan', address: '20 E 92nd St, New York, NY 10128', phone: '(212) 289-5020', website: 'https://www.nightingale.org', languages: ['English'], description: "All-girls independent K-12 school on Carnegie Hill known for academics and community.", grades: 'K-12' },
  { id: 63, name: 'The Windsor School', type: 'high school', borough: 'Queens', address: '136-23 Sanford Ave, Flushing, NY 11355', phone: '(718) 359-8300', website: 'https://www.windsorschool.com', languages: ['English'], description: 'Independent co-ed high school in Flushing with strong college preparation programs.', grades: '9-12' },

  // ─── MIDDLE SCHOOLS (existing) ─────────────────────────────────────────────
  { id: 19, name: 'NYC Lab Middle School', type: 'middle school', borough: 'Manhattan', address: '333 W 17th St, New York, NY 10011', phone: '(212) 691-6119', website: 'https://www.nyclabschool.org', languages: ['English', 'Spanish'], description: 'Progressive middle school with project-based learning and ESL support.', grades: '6-8' },
  { id: 20, name: 'IS 318 Eugenio Maria de Hostos', type: 'middle school', borough: 'Brooklyn', address: '101 Walton St, Brooklyn, NY 11206', phone: '(718) 388-1299', website: 'https://www.is318.org', languages: ['English', 'Spanish'], description: 'Public middle school with strong chess program and bilingual education.', grades: '6-8' },
  { id: 21, name: 'MS 137 Americas School of Heroes', type: 'middle school', borough: 'Queens', address: '142-01 Franklin Ave, Queens, NY 11355', phone: '(718) 762-4800', website: 'https://www.ms137.org', languages: ['English', 'Spanish', 'Chinese'], description: 'Middle school serving diverse immigrant communities in Queens.', grades: '6-8' },
  { id: 22, name: 'Bronx Academy of Letters', type: 'middle school', borough: 'Bronx', address: '1153 Plimpton Ave, Bronx, NY 10452', phone: '(718) 293-2200', website: 'https://www.bronxacademyofletters.org', languages: ['English', 'Spanish'], description: 'Middle and high school focused on literacy and writing with bilingual support.', grades: '6-12' },

  // ─── PRIMARY SCHOOLS (existing) ────────────────────────────────────────────
  { id: 23, name: 'PS 158 Baylard Taylor', type: 'primary school', borough: 'Manhattan', address: '1458 York Ave, New York, NY 10075', phone: '(212) 744-8139', website: 'https://www.ps158.org', languages: ['English', 'Spanish'], description: 'Public elementary school with strong academic programs and ESL support.', grades: 'K-5' },
  { id: 24, name: 'PS 89 Queens', type: 'primary school', borough: 'Queens', address: '44-25 Douglaston Pkwy, Queens, NY 11363', phone: '(718) 631-6890', website: 'https://www.ps89q.org', languages: ['English', 'Spanish', 'Chinese'], description: 'Elementary school serving diverse Queens families with multilingual programs.', grades: 'K-5' },
  { id: 25, name: 'PS 147 Isaac Remsen', type: 'primary school', borough: 'Brooklyn', address: '325 Bushwick Ave, Brooklyn, NY 11206', phone: '(718) 574-0750', website: 'https://www.ps147.org', languages: ['English', 'Spanish', 'Arabic'], description: 'Elementary school with strong bilingual programs serving immigrant families.', grades: 'K-5' },
  { id: 26, name: 'PS 277 Gerritsen Beach', type: 'primary school', borough: 'Brooklyn', address: '2529 Gerritsen Ave, Brooklyn, NY 11229', phone: '(718) 743-5400', website: 'https://www.ps277.org', languages: ['English', 'Spanish'], description: 'Elementary school with dedicated ESL programs for new immigrant children.', grades: 'K-5' },
  { id: 27, name: 'PS 48 William Wordsworth', type: 'primary school', borough: 'Bronx', address: '4360 Katonah Ave, Bronx, NY 10470', phone: '(718) 882-9654', website: 'https://www.ps48bronx.org', languages: ['English', 'Spanish'], description: 'Elementary school serving the Bronx with bilingual and ESL programs.', grades: 'K-5' },

  // ─── PRIMARY SCHOOLS (new – top-ranked) ───────────────────────────────────
  { id: 64, name: 'The Anderson School (PS 334)', type: 'primary school', borough: 'Manhattan', address: '100 W 77th St, New York, NY 10024', phone: '(212) 595-7958', website: 'https://www.theandersonschool.org', languages: ['English'], description: 'Highly selective gifted-and-talented public school on the Upper West Side, consistently ranked among the best in NYC.', grades: 'K-8' },
  { id: 65, name: 'NEST+m (New Explorations into Science, Technology and Math)', type: 'primary school', borough: 'Manhattan', address: '111 Columbia St, New York, NY 10002', phone: '(212) 358-3192', website: 'https://www.nestmk12.net', languages: ['English'], description: 'Gifted-and-talented public K-12 school on the Lower East Side specializing in STEM and the arts.', grades: 'K-12' },
  { id: 66, name: 'PS 77 Lower Lab School', type: 'primary school', borough: 'Manhattan', address: '1700 3rd Ave, New York, NY 10128', phone: '(212) 831-3873', website: 'https://www.ps77.org', languages: ['English'], description: 'Top-ranked gifted-and-talented public elementary school on the Upper East Side.', grades: 'K-5' },
  { id: 67, name: 'Special Music School (PS 859)', type: 'primary school', borough: 'Manhattan', address: '129 W 67th St, New York, NY 10023', phone: '(212) 501-3395', website: 'https://www.specialmusicschool.org', languages: ['English'], description: 'Unique public K-8 school combining rigorous academics with intensive conservatory-level music training.', grades: 'K-8' },
  { id: 68, name: 'TAG Young Scholars School (PS 188)', type: 'primary school', borough: 'Manhattan', address: '442 E Houston St, New York, NY 10002', phone: '(212) 677-5730', website: 'https://www.ps188.org', languages: ['English', 'Spanish'], description: 'Gifted-and-talented public school on the Lower East Side serving academically advanced students.', grades: 'K-5' },
  { id: 69, name: 'Success Academy Charter Schools', type: 'primary school', borough: 'Manhattan', address: '95 Pine St, New York, NY 10005', phone: '(212) 402-7669', website: 'https://www.successacademy.org', languages: ['English'], description: 'Network of high-performing public charter schools across NYC known for exceptional academic outcomes.', grades: 'K-12' },
  { id: 70, name: 'PS 188 Kingsbury', type: 'primary school', borough: 'Queens', address: '69-05 204th St, Bayside, NY 11364', phone: '(718) 357-5083', website: 'https://www.ps188q.org', languages: ['English', 'Chinese'], description: 'High-performing public elementary school in Queens with strong academics and parental involvement.', grades: 'K-5' },
  { id: 71, name: 'PS 203 Oakland Gardens', type: 'primary school', borough: 'Queens', address: '74-20 Commonwealth Blvd, Queens, NY 11426', phone: '(718) 468-8305', website: 'https://www.ps203q.org', languages: ['English', 'Chinese'], description: 'Consistently top-ranked public elementary school in Queens with excellent test scores.', grades: 'K-5' },

  // Manhattan top elementary (new)
  { id: 72, name: 'PS 6 Lillie Devereaux Blake', type: 'primary school', borough: 'Manhattan', address: '45 E 81st St, New York, NY 10028', phone: '(212) 744-3820', website: 'https://www.ps6.org', languages: ['English'], description: 'Highly regarded Upper East Side public elementary school known for strong academics and community.', grades: 'K-5' },
  { id: 73, name: 'PS 234 Independence School', type: 'primary school', borough: 'Manhattan', address: '292 Greenwich St, New York, NY 10007', phone: '(212) 233-6034', website: 'https://www.ps234.org', languages: ['English', 'Spanish'], description: 'Top-performing public elementary school in TriBeCa with progressive, inquiry-based learning.', grades: 'PK-5' },
  { id: 74, name: 'PS 199 Jessie Isador Straus', type: 'primary school', borough: 'Manhattan', address: '270 W 70th St, New York, NY 10023', phone: '(212) 799-1722', website: 'https://www.ps199.org', languages: ['English'], description: 'Highly ranked public elementary school on the Upper West Side with strong parental engagement.', grades: 'PK-5' },

  // Brooklyn top elementary (new)
  { id: 75, name: 'PS 321 William Penn', type: 'primary school', borough: 'Brooklyn', address: '180 7th Ave, Brooklyn, NY 11215', phone: '(718) 499-2412', website: 'https://www.ps321.org', languages: ['English', 'Spanish'], description: 'One of Brooklyn\'s most sought-after public elementary schools in Park Slope, known for community and academics.', grades: 'PK-5' },
  { id: 76, name: 'PS 107 John W. Kimball', type: 'primary school', borough: 'Brooklyn', address: '1301 8th Ave, Brooklyn, NY 11215', phone: '(718) 768-3276', website: 'https://www.ps107.org', languages: ['English'], description: 'High-performing public elementary school in Park Slope with strong test scores and arts programs.', grades: 'K-5' },
  { id: 77, name: 'PS 8 Robert Fulton', type: 'primary school', borough: 'Brooklyn', address: '37 Hicks St, Brooklyn, NY 11201', phone: '(718) 834-2125', website: 'https://www.ps8k.org', languages: ['English'], description: 'Top-ranked public elementary school in Brooklyn Heights known for academics and vibrant community.', grades: 'PK-5' },

  // Queens top elementary (new)
  { id: 78, name: 'PS 173 Fresh Meadows', type: 'primary school', borough: 'Queens', address: '60-05 192nd St, Fresh Meadows, NY 11365', phone: '(718) 464-5051', website: 'https://www.ps173q.org', languages: ['English', 'Chinese'], description: 'High-achieving public elementary school in Fresh Meadows with strong academic programs.', grades: 'K-5' },

  // Bronx top elementary (new)
  { id: 79, name: 'PS 24 Spuyten Duyvil', type: 'primary school', borough: 'Bronx', address: '660 W 236th St, Bronx, NY 10463', phone: '(718) 796-8642', website: 'https://www.ps24bronx.org', languages: ['English', 'Spanish'], description: 'One of the top-ranked public elementary schools in the Bronx, known for academic excellence.', grades: 'PK-5' },
  { id: 80, name: 'PS 81 Robert Christen', type: 'primary school', borough: 'Bronx', address: '1650 Summit Ave, Bronx, NY 10452', phone: '(718) 293-2610', website: 'https://www.ps81bronx.org', languages: ['English', 'Spanish'], description: 'Highly regarded public elementary school in the Bronx with dedicated teachers and strong community ties.', grades: 'K-5' },
];

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  university: { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
  college: { bg: '#e0e7ff', text: '#4338ca', border: '#6366f1' },
  'high school': { bg: '#fef3c7', text: '#b45309', border: '#f59e0b' },
  'middle school': { bg: '#dcfce7', text: '#15803d', border: '#22c55e' },
  'primary school': { bg: '#fce7f3', text: '#be185d', border: '#ec4899' },
};

interface SchoolsProps {
  language?: LanguageCode;
}

export default function Schools({ language = 'en' }: SchoolsProps) {
  const [selectedType, setSelectedType] = useState<SchoolType>('all');
  const [selectedBorough, setSelectedBorough] = useState<Borough>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('all');
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleTypeChange = (type: SchoolType) => {
  setHasInteracted(true);
  setSelectedType(type);
  setSelectedBorough('all');
  setSelectedLanguage('all');
};

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

  const btnStyle = (active: boolean, color: string) => ({
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: active ? 600 : 400,
    background: active ? color : '#f9fafb',
    color: active ? '#ffffff' : '#374151',
    border: active ? 'none' : '1px solid #e5e7eb',
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  });

  return (
    <section className="py-16" style={{ background: '#f0f7ff', borderTop: '1px solid #e5e7eb' }}>
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: '#dbeafe' }}>
            <GraduationCap className="w-8 h-8" style={{ color: '#2a9df4' }} />
          </div>
          <h2 className="text-4xl font-bold mb-3" style={{ color: '#1e293b' }}>Schools in New York</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Find universities, colleges, and schools across all five boroughs</p>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm" style={{ border: '1px solid #e5e7eb' }}>
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">School Type</p>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button key={type.id} onClick={() => handleTypeChange(type.id)} style={btnStyle(selectedType === type.id, '#2a9df4')}>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Borough</p>
            <div className="flex flex-wrap gap-2">
              {boroughs.map(borough => (
                <button key={borough} onClick={() => setSelectedBorough(borough)} style={btnStyle(selectedBorough === borough, '#1e293b')}>
                  {borough === 'all' ? 'All Boroughs' : borough}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Language of Instruction</p>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <button key={lang} onClick={() => setSelectedLanguage(lang)} style={btnStyle(selectedLanguage === lang, '#10b981')}>
                  {lang === 'all' ? 'All Languages' : lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">Showing {filtered.length} of {schools.length} schools</p>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No schools found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', padding: '0 8px' }}>
            {filtered.map(school => {
              const colors = typeColors[school.type] || typeColors['university'];
              return (
                <div key={school.id} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all" style={{ border: '1px solid #e5e7eb', borderTop: '4px solid ' + colors.border }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full capitalize" style={{ background: colors.bg, color: colors.text }}>
                      {school.type}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{school.borough}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-base mb-2">{school.name}</h3>
                  {school.grades && (
                    <p className="text-xs font-medium mb-2" style={{ color: colors.text }}>Grades: {school.grades}</p>
                  )}
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{school.description}</p>
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
                  <div className="flex flex-wrap gap-1 mb-4">
                    {school.languages.map(lang => (
                      <span key={lang} className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}>
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={school.website} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, background: colors.bg, color: colors.text, textDecoration: 'none' }}>
                      <Globe className="w-4 h-4" />
                      <span>Visit Website</span>
                    </a>
                    <a href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(school.address)} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 500, background: '#f9fafb', color: '#374151', border: '1px solid #e5e7eb', textDecoration: 'none' }}>
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