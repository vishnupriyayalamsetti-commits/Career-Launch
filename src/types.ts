export type TabType = 'home' | 'jobs' | 'job-details' | 'register' | 'dashboard' | 'contact';

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  employees: string;
  rating: number;
  openings: number;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyId: string;
  logo: string;
  location: string;
  salary: string;
  type: 'fresher' | 'experienced';
  skills: string[];
  description: string;
  requirements: string[];
  postedDate: string;
  category: string;
  experienceRequired: string;
}

export interface StudentProfile {
  name: string;
  email: string;
  collegeName: string;
  skills: string[];
  resumeName: string | null;
  resumeDataUrl: string | null; // For holding mock uploaded documents
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  appliedDate: string;
  status: 'applied' | 'under revision' | 'shortlisted' | 'interview scheduled' | 'offered' | 'not selected';
}

export interface SavedJob {
  id: string;
  savedDate: string;
}
