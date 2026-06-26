import { Job, Company, Notification } from './types';

export const companiesData: Company[] = [
  {
    id: 'beximco',
    name: 'Beximco Apparels Ltd.',
    logo: 'B',
    banner: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1200&q=80',
    location: 'DEPZ Gate 1, Ashulia, Savar, Dhaka',
    size: '10,000+ Employees',
    founded: '1984',
    website: 'https://www.beximco.com',
    description: 'Beximco Apparels Limited is a leading joint-venture export-oriented garments manufacturing company in Bangladesh. Located inside the Dhaka Export Processing Zone, we produce premium quality knit and woven apparel for international brands in Europe and North America.',
    isVerified: true,
    industry: 'Woven & Knitwear Manufacturing',
    rating: 4.8,
    jobsCount: 14
  },
  {
    id: 'hameem',
    name: 'Ha-Meem Group Apparels',
    logo: 'H',
    banner: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    location: 'Narayonpur, Jamgora, Ashulia, Savar',
    size: '15,000+ Employees',
    founded: '1984',
    website: 'https://www.hameemgroup.com',
    description: 'Ha-Meem Group is a leading wholesale clothing manufacturer in Bangladesh and in the world. The company produces some of the most fashionable denim wear and owns one of the most sophisticated washing plants in the country.',
    isVerified: true,
    industry: 'Denim & Woven Apparel',
    rating: 4.6,
    jobsCount: 9
  },
  {
    id: 'dbl',
    name: 'DBL Group (Dulal Brothers)',
    logo: 'D',
    banner: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=1200&q=80',
    location: 'Bypail-Abdullahpur Road, Ashulia, Savar',
    size: '25,000+ Employees',
    founded: '1991',
    website: 'https://www.dbl-group.com',
    description: 'DBL Group is a diversified conglomerate with a strong focus on backward-integrated apparel and textile manufacturing. We supply top global apparel brands like H&M, Walmart, Esprit, and Puma with sustainable green-certified factories.',
    isVerified: true,
    industry: 'Textiles & Integrated Apparel',
    rating: 4.7,
    jobsCount: 11
  },
  {
    id: 'envoy',
    name: 'Envoy Textiles & Fashion',
    logo: 'E',
    banner: 'https://images.unsplash.com/photo-1520607162513-8927a5393b9d?auto=format&fit=crop&w=1200&q=80',
    location: 'Zirani Bazar, Ashulia, Savar',
    size: '8,000+ Employees',
    founded: '1996',
    website: 'https://www.envoygroup.com',
    description: 'Envoy Textiles is the world’s first LEED Platinum-certified denim mill. We produce high-performance, eco-friendly textile materials and premium casual woven clothes for global export markets.',
    isVerified: true,
    industry: 'Denim Fabrics & Apparel',
    rating: 4.5,
    jobsCount: 7
  },
  {
    id: 'palmal',
    name: 'Palmal Group of Industries',
    logo: 'P',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    location: 'Nabinagar Circle, Savar, Dhaka',
    size: '12,000+ Employees',
    founded: '1984',
    website: 'https://www.palmalgroup.com',
    description: 'Palmal Group is one of the pioneer garment manufacturers in Bangladesh. Focused heavily on high-end knitwear, casual shirts, jackets, and sportswear, with over 30 state-of-the-art sewing and finishing units.',
    isVerified: false,
    industry: 'Knit & Sportswear Apparel',
    rating: 4.2,
    jobsCount: 5
  },
  {
    id: 'mohammadi',
    name: 'Mohammadi Group',
    logo: 'M',
    banner: 'https://images.unsplash.com/photo-1513829096999-4978602294fc?auto=format&fit=crop&w=1200&q=80',
    location: 'Baipail Bypass, Ashulia, Savar',
    size: '6,500+ Employees',
    founded: '1986',
    website: 'https://www.mohammadigroup.com',
    description: 'Mohammadi Group is an established garments exporter catering to leading retail conglomerates. We maintain a high degree of workplace compliance and safety standards, providing premium worker environments.',
    isVerified: true,
    industry: 'Woven Shirts & Knit Tops',
    rating: 4.4,
    jobsCount: 4
  }
];

export const jobsData: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Sewing Machine Operator (Woven/Denim)',
    companyId: 'hameem',
    companyName: 'Ha-Meem Group Apparels',
    logo: 'H',
    location: 'Jamgora, Ashulia',
    salaryMin: 14500,
    salaryMax: 18500,
    salaryType: 'monthly',
    experienceYears: 3,
    education: 'Class 8 Pass',
    shift: 'Day',
    gender: 'Any',
    employmentType: 'Full-Time',
    datePosted: '2026-06-26',
    deadline: '2026-07-20',
    isFeatured: true,
    isUrgent: true,
    isNewToday: true,
    isVerified: true,
    description: 'We are seeking experienced Sewing Machine Operators to join our high-volume export denim line in Jamgora. Candidates must demonstrate proficiency in flat-lock, overlock, and heavy-duty sewing processes.',
    responsibilities: [
      'Operate advanced industrial sewing machines to stitch pockets, waistbands, and seams of denim trousers.',
      'Achieve daily target line outputs set by the Line Chief (minimum 80 garments per hour).',
      'Follow strict garment dimensions and sewing instructions to prevent fabric wastage.',
      'Maintain a neat and organized sewing workbench, reporting machinery faults immediately.'
    ],
    requirements: [
      'Minimum 3 years of experience in woven/denim garment sewing.',
      'Ability to pass a fast-paced physical sewing test at our factory gate recruitment room.',
      'Strong concentration, speed, and punctuality.',
      'Must have basic literacy to read size cards and instructions.'
    ],
    benefits: [
      'Attendance Bonus: ৳1,000 per month.',
      'Two festival bonuses per year (based on basic salary).',
      'Overtime allowance (Double of normal hourly basic rate).',
      'Free high-quality medical clinic access inside the factory premises.',
      'Monthly subsidized food and grocery vouchers.'
    ],
    vacancies: 45,
    contactEmail: 'hr.jamgora@hameemgroup.com',
    contactPhone: '01712345678'
  },
  {
    id: 'job-2',
    title: 'Assistant Sewing Operator (Knit - Female)',
    companyId: 'beximco',
    companyName: 'Beximco Apparels Ltd.',
    logo: 'B',
    location: 'DEPZ Gate 1, Ashulia',
    salaryMin: 11000,
    salaryMax: 13500,
    salaryType: 'monthly',
    experienceYears: 1,
    education: 'Class 5 Pass',
    shift: 'Day',
    gender: 'Female',
    employmentType: 'Full-Time',
    datePosted: '2026-06-26',
    deadline: '2026-07-15',
    isFeatured: false,
    isUrgent: false,
    isNewToday: true,
    isVerified: true,
    description: 'Urgent helper to operator path positions open for female garments workers. Join Beximco in DEPZ for stable monthly payments, regular pay structures, and free transport from Ashulia central points.',
    responsibilities: [
      'Assist senior operators by arranging fabric parts and loading trims.',
      'Handle basic stitching lines under direct supervisor guidance.',
      'Check garments for simple stitching flaws before passing to the Quality Table.'
    ],
    requirements: [
      'At least 1 year of apparel sewing or helping experience in a major knit factory.',
      'Highly disciplined and punctual.',
      'Candidates from Ashulia, Savar, or Nabinagar will get transport priority.'
    ],
    benefits: [
      'Punctuality/Attendance Bonus: ৳800.',
      'Free factory bus transportation along Ashulia highway.',
      'Annual leave cash-out benefits.',
      'Maternity leaves and financial grants as per BD Labor Law.'
    ],
    vacancies: 60,
    contactEmail: 'recruitment@beximco.com',
    contactPhone: '01811223344'
  },
  {
    id: 'job-3',
    title: 'Garments Quality Control (QC) Inspector',
    companyId: 'dbl',
    companyName: 'DBL Group (Dulal Brothers)',
    logo: 'D',
    location: 'Bypail, Ashulia',
    salaryMin: 18000,
    salaryMax: 24000,
    salaryType: 'monthly',
    experienceYears: 2,
    education: 'HSC Passed',
    shift: 'Both',
    gender: 'Any',
    employmentType: 'Full-Time',
    datePosted: '2026-06-25',
    deadline: '2026-07-25',
    isFeatured: true,
    isUrgent: true,
    isNewToday: false,
    isVerified: true,
    description: 'DBL Group is seeking highly qualified Quality Inspectors to monitor knitwear finishing and sewing lines in our Platinum-grade sustainable facility in Ashulia. You will check dimensions and shades.',
    responsibilities: [
      'Perform hourly quality inspections on standard production lines.',
      'Validate measurement dimensions against original tech packs and global buyers standards.',
      'Segregate and mark major defects (broken stitches, shade variance, oil stains).',
      'Lead simple line-end training for operators failing output quality tests.'
    ],
    requirements: [
      'HSC level education. Basic computer literacy is preferred.',
      'Minimum 2 years of quality control experience in export garments.',
      'Clear understanding of AQL 1.5/2.5 quality parameters.',
      'Good eyesight and attention to detail.'
    ],
    benefits: [
      'Provident Fund (PF) and Gratuity benefits.',
      'Subsidized daily lunch at factory canteen.',
      'Overtime allowance and night shift special allowance (৳200/night).',
      'Safe and compliant working environment (LEED certified).'
    ],
    vacancies: 15,
    contactEmail: 'career@dbl-group.com',
    contactPhone: '01912341234'
  },
  {
    id: 'job-4',
    title: 'Woven Pattern Maker (CAD Specialist)',
    companyId: 'envoy',
    companyName: 'Envoy Textiles & Fashion',
    logo: 'E',
    location: 'Zirani Bazar, Ashulia',
    salaryMin: 35000,
    salaryMax: 50000,
    salaryType: 'monthly',
    experienceYears: 4,
    education: 'Diploma in Garments Tech / Graduate',
    shift: 'Day',
    gender: 'Any',
    employmentType: 'Full-Time',
    datePosted: '2026-06-24',
    deadline: '2026-07-30',
    isFeatured: true,
    isUrgent: false,
    isNewToday: false,
    isVerified: true,
    description: 'We are seeking a skilled CAD Pattern Maker experienced in Optitex or Gerber software to translate European buyer specifications into high-efficiency fabric markers for automatic cutting machines.',
    responsibilities: [
      'Create standard block patterns, size grading sheets, and final CAD markers.',
      'Minimize fabric wastage and maximize fabric consumption efficiency (marker efficiency > 85%).',
      'Collaborate with the sampling room to produce and adjust fit samples.',
      'Handle digital pattern files, backups, and pattern plotter operations.'
    ],
    requirements: [
      'Diploma in Garments Technology, Fashion Design, or a related field.',
      'Minimum 4 years of solid hands-on CAD pattern design experience.',
      'Proficient in Optitex, Gerber, or Lectra CAD systems.',
      'Good communication skills in English to read buyer tech packs.'
    ],
    benefits: [
      'Highly competitive monthly salary with yearly increments.',
      'Full executive facilities including family healthcare insurance.',
      'Air-conditioned premium office workspace.',
      'Subsidized buffet meals in the executive lounge.',
      'Provident fund and corporate bonuses.'
    ],
    vacancies: 3,
    contactEmail: 'careers.textiles@envoygroup.com',
    contactPhone: '01511224455'
  },
  {
    id: 'job-5',
    title: 'Assistant Merchandiser (Apparel)',
    companyId: 'mohammadi',
    companyName: 'Mohammadi Group',
    logo: 'M',
    location: 'Baipail Bypass, Ashulia',
    salaryMin: 25000,
    salaryMax: 35000,
    salaryType: 'monthly',
    experienceYears: 1,
    education: 'Graduate (BBA / Textile Engineering)',
    shift: 'Day',
    gender: 'Any',
    employmentType: 'Full-Time',
    datePosted: '2026-06-26',
    deadline: '2026-07-18',
    isFeatured: false,
    isUrgent: true,
    isNewToday: true,
    isVerified: true,
    description: 'Mohammadi Group is looking for energetic candidates who have recently graduated or have 1 year of experience to work under our Senior Merchandiser, assisting in fabric and trim sourcing for export orders.',
    responsibilities: [
      'Assist in booking trims, threads, labels, and outer cartons with vendors.',
      'Draft daily sourcing status sheets and follow up on shipment deadlines.',
      'Organize and submit pre-production samples to buyers for official seal approval.',
      'Coordinate with the commercial team to process L/C papers.'
    ],
    requirements: [
      'Bachelor’s degree from a reputed university, ideally in Fashion Sourcing, Textiles, or Business administration.',
      'At least 1 year of active merchandising or apparel commercial team experience.',
      'Superb command of spoken and written English, plus proficiency in Microsoft Excel.',
      'Ability to thrive under tight order shipping timelines.'
    ],
    benefits: [
      'Structured career track to Senior Merchandiser within 3 years.',
      'Transport facilities to and from Dhaka city office (Uttara/Mirpur).',
      'Two annual festival bonuses.',
      'Comprehensive company healthcare coverage.'
    ],
    vacancies: 5,
    contactEmail: 'hrd@mohammadigroup.com',
    contactPhone: '01611223344'
  },
  {
    id: 'job-6',
    title: 'Night Shift Line Chief / Line Supervisor',
    companyId: 'palmal',
    companyName: 'Palmal Group of Industries',
    logo: 'P',
    location: 'Nabinagar Circle, Savar',
    salaryMin: 22000,
    salaryMax: 30000,
    salaryType: 'monthly',
    experienceYears: 5,
    education: 'SSC Passed',
    shift: 'Night',
    gender: 'Any',
    employmentType: 'Full-Time',
    datePosted: '2026-06-23',
    deadline: '2026-07-12',
    isFeatured: false,
    isUrgent: false,
    isNewToday: false,
    isVerified: false,
    description: 'We require a strict and highly capable Line Chief to manage continuous sewing lines in the night shift. Direct, train, and manage operators to maintain target levels on a 15-machine polo shirt line.',
    responsibilities: [
      'Establish machine layout of the assigned production line at start of shift.',
      'Audit machine stitch adjustments to ensure consistent quality.',
      'Manage team schedule, resolve conflict, and motivate operators to hit the night quota.',
      'Coordinate with the QA controller to clear lines of any bulk issues.'
    ],
    requirements: [
      'Minimum 5 years of experience as a sewing Operator or Assistant Supervisor.',
      'Demonstrated leadership to control a line of 30+ workers.',
      'Experience in circular knit, polo shirts, and casual shirts is required.',
      'Ability to work night shift reliably.'
    ],
    benefits: [
      'Night shift food allowance (৳150/night).',
      'Free corporate housing or rent allowances near factory bounds.',
      'Punctuality bonus: ৳1,500.',
      'Overtime multiplier structure.'
    ],
    vacancies: 8,
    contactEmail: 'hr.nabinagar@palmalgroup.com',
    contactPhone: '01311223344'
  },
  {
    id: 'job-7',
    title: 'Garments Production Helper (Fresher - Female/Male)',
    companyId: 'beximco',
    companyName: 'Beximco Apparels Ltd.',
    logo: 'B',
    location: 'DEPZ Gate 1, Ashulia',
    salaryMin: 9500,
    salaryMax: 11000,
    salaryType: 'monthly',
    experienceYears: 0,
    education: 'None / Primary',
    shift: 'Day',
    gender: 'Any',
    employmentType: 'Apprentice',
    datePosted: '2026-06-26',
    deadline: '2026-07-31',
    isFeatured: false,
    isUrgent: false,
    isNewToday: true,
    isVerified: true,
    description: 'Beximco is hiring 100+ fresh garments helpers to support our large woven shirt and knit activewear lines inside DEPZ Ashulia. No prior experience is needed; we provide full paid sewing apprentice training!',
    responsibilities: [
      'Carry fabrics, cutting pieces, and accessories to sewing lines.',
      'Trim extra loose threads using clippers before final folding.',
      'Sort, number, and bundle finished pieces by size and dye lot.'
    ],
    requirements: [
      'No formal education required. Simple count literacy is preferred.',
      'Age above 18 years. National ID Card (NID) or Birth Certificate is mandatory.',
      'Hardworking, cooperative, and willing to learn industrial sewing techniques.'
    ],
    benefits: [
      'Fully paid 3-month apprentice training: get promoted to Sewing Operator!',
      'Free boarding hostels for female candidates.',
      'Standard attendance bonuses & overtime pays.',
      'Subsidized rice, lentils, and basic grocery items provided monthly.'
    ],
    vacancies: 120,
    contactEmail: 'training-depz@beximco.com',
    contactPhone: '01855667788'
  },
  {
    id: 'job-8',
    title: 'Garments Factory HR & Compliance Officer',
    companyId: 'dbl',
    companyName: 'DBL Group (Dulal Brothers)',
    logo: 'D',
    location: 'Bypail, Ashulia',
    salaryMin: 30000,
    salaryMax: 40000,
    salaryType: 'monthly',
    experienceYears: 2,
    education: 'Graduate / BBA in HRM',
    shift: 'Day',
    gender: 'Any',
    employmentType: 'Full-Time',
    datePosted: '2026-06-25',
    deadline: '2026-07-28',
    isFeatured: true,
    isUrgent: false,
    isNewToday: false,
    isVerified: true,
    description: 'We are seeking an HR and Compliance Officer to ensure our factory floors continuously comply with ILO (International Labour Organization) rules, buyer codes of conduct, and BSCI audit regulations.',
    responsibilities: [
      'Audit safety features on sewing floors (fire escape clearings, needle guard locks, face masks).',
      'Manage worker attendance databases, leaf requests, and legal overtime registers.',
      'Address worker feedback boxes, organizing regular worker union-management dialogs.',
      'Lead and document factory safety fire drills twice per month.'
    ],
    requirements: [
      'BBA or MBA in Human Resources Management (HRM) or relevant law degree.',
      'At least 2 years of compliance officer experience inside an export garment factory.',
      'Strong knowledge of the Bangladesh Labor Act 2006 (amended 2013).',
      'Polished communication and presentation skills.'
    ],
    benefits: [
      'Provident Fund & Gratuity.',
      'Premium medical insurance.',
      'Company bus transportation and daily executive lunches.',
      'Two yearly festival bonuses and profit shares.'
    ],
    vacancies: 2,
    contactEmail: 'compliance@dbl-group.com',
    contactPhone: '01999888777'
  }
];

export const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'New Circular Today!',
    message: 'Beximco Apparels Ltd. just published a new circular for "Assistant Sewing Operator (Knit - Female)" in DEPZ Ashulia.',
    type: 'success',
    timestamp: '2 mins ago',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Urgent Sewing Job!',
    message: 'Ha-Meem Group needs 45 Sewing Operators urgently in Jamgora, Ashulia. Starting salary up to ৳18,500.',
    type: 'urgent',
    timestamp: '25 mins ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'AQL Compliance Update',
    message: 'Admin updated guidelines for Garments QA candidates applying in Savar area industrial zones.',
    type: 'info',
    timestamp: '2 hours ago',
    read: true
  },
  {
    id: 'notif-4',
    title: 'Interview Shortlist',
    message: 'Congratulations! Your application for QC Inspector at DBL Group was shortlisted. Check Candidate Dashboard.',
    type: 'success',
    timestamp: 'Yesterday',
    read: true
  }
];
