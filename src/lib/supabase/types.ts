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
      admission_enquiries: {
        Row: {
          id: string
          parent_name: string
          student_name: string
          applying_for_class: string
          phone: string
          email: string | null
          preferred_contact_method: string | null
          message: string | null
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
          source: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_name: string
          student_name: string
          applying_for_class: string
          phone: string
          email?: string | null
          preferred_contact_method?: string | null
          message?: string | null
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
          source?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_name?: string
          student_name?: string
          applying_for_class?: string
          phone?: string
          email?: string | null
          preferred_contact_method?: string | null
          message?: string | null
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed'
          source?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      contact_enquiries: {
        Row: {
          id: string
          name: string
          phone: string | null
          email: string | null
          subject: string | null
          category: string | null
          message: string
          status: 'new' | 'contacted' | 'closed'
          source: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string | null
          email?: string | null
          subject?: string | null
          category?: string | null
          message: string
          status?: 'new' | 'contacted' | 'closed'
          source?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          email?: string | null
          subject?: string | null
          category?: string | null
          message?: string
          status?: 'new' | 'contacted' | 'closed'
          source?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
