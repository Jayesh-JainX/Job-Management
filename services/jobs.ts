import { supabase } from '../lib/supabase';
import { JobFormData, JobFilters } from '../types/job';
import { Database } from '../types/database';

type JobRow = Database['public']['Tables']['jobs']['Row'];
type JobInsert = Database['public']['Tables']['jobs']['Insert'];

export const jobsService = {
  async createJob(jobData: JobFormData): Promise<JobRow | null> {
    const { data, error } = await supabase.from('jobs').insert({
      title: jobData.title,
      company_name: jobData.companyName,
      location: jobData.location,
      job_type: jobData.jobType,
      salary_range_min: jobData.salaryRange.min,
      salary_range_max: jobData.salaryRange.max,
      description: jobData.description,
      requirements: jobData.requirements,
      responsibilities: jobData.responsibilities,
      application_deadline: jobData.applicationDeadline.toISOString(),
      company_logo: jobData.companyLogo
    } as JobInsert).select().single();

    if (error) {
      console.error('Error creating job:', error);
      return null;
    }

    return data;
  },

  async getJobs(filters?: JobFilters) {
    console.log('Fetching jobs with filters:', filters);
    let query = supabase.from('jobs').select();

    if (filters) {
      if (filters.title?.trim()) {
        query = query.ilike('title', `%${filters.title.trim()}%`);
      }

      if (filters.location?.trim()) {
        query = query.ilike('location', `%${filters.location.trim()}%`);
      }

      if (filters.jobType) {
        query = query.eq('job_type', filters.jobType);
      }

      if (filters.salaryRange?.min !== undefined && filters.salaryRange?.max !== undefined) {
        query = query
          .gte('salary_range_min', filters.salaryRange.min)
          .lte('salary_range_max', filters.salaryRange.max);
      }
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    console.log('Fetched jobs data:', data);

    if (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }

    return data?.map(job => ({
      id: job.id,
      title: job.title,
      companyName: job.company_name,
      location: job.location,
      jobType: job.job_type,
      salaryRange: {
        min: job.salary_range_min,
        max: job.salary_range_max
      },
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      applicationDeadline: new Date(job.application_deadline),
      createdAt: new Date(job.created_at),
      updatedAt: new Date(job.updated_at),
      companyLogo: job.company_logo
    })) || [];
  },

  async getJobById(id: string): Promise<JobRow | null> {
    const { data, error } = await supabase
      .from('jobs')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching job:', error);
      return null;
    }

    return data;
  },

  async updateJob(id: string, jobData: Partial<JobFormData>): Promise<JobRow | null> {
    const { data, error } = await supabase
      .from('jobs')
      .update({
        title: jobData.title,
        company_name: jobData.companyName,
        location: jobData.location,
        job_type: jobData.jobType,
        salary_range_min: jobData.salaryRange?.min,
        salary_range_max: jobData.salaryRange?.max,
        description: jobData.description,
        requirements: jobData.requirements,
        responsibilities: jobData.responsibilities,
        application_deadline: jobData.applicationDeadline?.toISOString(),
        company_logo: jobData.companyLogo
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating job:', error);
      return null;
    }

    return data;
  },

  async deleteJob(id: string): Promise<boolean> {
    const { error } = await supabase.from('jobs').delete().eq('id', id);

    if (error) {
      console.error('Error deleting job:', error);
      return false;
    }

    return true;
  }
};