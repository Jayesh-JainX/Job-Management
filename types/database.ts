export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          title: string
          company_name: string
          location: string
          job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
          salary_range_min: number
          salary_range_max: number
          description: string
          requirements: string
          responsibilities: string
          application_deadline: string
          created_at: string
          updated_at: string
          company_logo: string | null
        }
        Insert: {
          id?: string
          title: string
          company_name: string
          location: string
          job_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
          salary_range_min: number
          salary_range_max: number
          description: string
          requirements: string
          responsibilities: string
          application_deadline: string
          created_at?: string
          updated_at?: string
          company_logo?: string | null
        }
        Update: {
          id?: string
          title?: string
          company_name?: string
          location?: string
          job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
          salary_range_min?: number
          salary_range_max?: number
          description?: string
          requirements?: string
          responsibilities?: string
          application_deadline?: string
          created_at?: string
          updated_at?: string
          company_logo?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}