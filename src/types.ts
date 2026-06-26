export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  logo: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  salaryType: 'monthly' | 'negotiable';
  experienceYears: number; // 0 for fresher/helper
  education: string;
  shift: 'Day' | 'Night' | 'Both';
  gender: 'Male' | 'Female' | 'Any';
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Apprentice';
  datePosted: string; // YYYY-MM-DD
  deadline: string; // YYYY-MM-DD
  isFeatured: boolean;
  isUrgent: boolean;
  isNewToday: boolean;
  isVerified: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  vacancies: number;
  contactEmail: string;
  contactPhone: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  banner: string;
  location: string;
  size: string; // e.g. "5000+ Employees"
  founded: string;
  website: string;
  description: string;
  isVerified: boolean;
  industry: string;
  rating: number;
  jobsCount: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'urgent';
  timestamp: string; // relative or absolute
  read: boolean;
}

export interface FilterState {
  searchQuery: string;
  companyName: string;
  location: string;
  position: string;
  salaryRange: number; // Max salary slider filter
  experience: string; // 'all' | '0' | '1-3' | '3-5' | '5+'
  education: string; // 'all' | 'SSC' | 'HSC' | 'Graduate' | 'None'
  shift: string; // 'all' | 'Day' | 'Night'
  gender: string; // 'all' | 'Male' | 'Female' | 'Any'
  employmentType: string; // 'all' | 'Full-Time' | 'Contract' | 'Apprentice'
  datePosted: string; // 'all' | 'today' | '3days' | '7days'
}

export type ViewRole = 'candidate' | 'employer' | 'admin';

export interface SavedJob {
  id: string;
  savedAt: string;
}

export interface AppliedJob {
  jobId: string;
  appliedAt: string;
  status: 'Pending' | 'Shortlisted' | 'Selected' | 'Rejected';
  notes?: string;
}
