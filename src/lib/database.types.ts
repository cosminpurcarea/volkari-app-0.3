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
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          email: string | null
          country_code: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          country_code?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          email?: string | null
          country_code?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          default_questions_per_session: number
          default_seconds_per_question: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          default_questions_per_session?: number
          default_seconds_per_question?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          default_questions_per_session?: number
          default_seconds_per_question?: number
          created_at?: string
          updated_at?: string
        }
      }
      nouns: {
        Row: {
          id: string
          word: string
          article: 'der' | 'die' | 'das'
          translation: string
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          word: string
          article: 'der' | 'die' | 'das'
          translation: string
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          word?: string
          article?: 'der' | 'die' | 'das'
          translation?: string
          created_by?: string
          created_at?: string
        }
      }
      training_sessions: {
        Row: {
          id: string
          user_id: string
          correct_answers: number
          total_questions: number
          seconds_per_question: number
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          correct_answers: number
          total_questions: number
          seconds_per_question: number
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          correct_answers?: number
          total_questions?: number
          seconds_per_question?: number
          completed_at?: string
        }
      }
    }
  }
}