export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  jobType: JobType;
  salaryRange: {
    min: number;
    max: number;
  };
  description: string;
  requirements: string;
  responsibilities: string;
  applicationDeadline: Date;
  createdAt: Date;
  updatedAt: Date;
  companyLogo?: string;
}

export interface JobFormData extends Omit<Job, 'id' | 'createdAt' | 'updatedAt'> {}

export interface JobFilters {
  title?: string;
  location?: string;
  jobType?: JobType;
  salaryRange?: {
    min: number;
    max: number;
  };
}