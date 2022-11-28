export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      publication: {
        Row: {
          id: string
          name: string | null
          date: string | null
          publisher: string | null
          price: number | null
          description: string | null
          image_url: string | null
          edition: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          date?: string | null
          publisher?: string | null
          price?: number | null
          description?: string | null
          image_url?: string | null
          edition?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          date?: string | null
          publisher?: string | null
          price?: number | null
          description?: string | null
          image_url?: string | null
          edition?: string | null
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
