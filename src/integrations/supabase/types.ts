export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_name: string
          category: string
          content: string
          created_at: string
          excerpt: string
          featured_image: string | null
          id: string
          is_featured: boolean
          published_at: string
          read_time_mins: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          category: string
          content?: string
          created_at?: string
          excerpt?: string
          featured_image?: string | null
          id?: string
          is_featured?: boolean
          published_at?: string
          read_time_mins?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          featured_image?: string | null
          id?: string
          is_featured?: boolean
          published_at?: string
          read_time_mins?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      firm_reviews: {
        Row: {
          claimed_payout: boolean
          created_at: string
          firm_id: string
          id: string
          is_verified: boolean
          rating: number
          review_text: string
          status: string
          trader_name: string
        }
        Insert: {
          claimed_payout?: boolean
          created_at?: string
          firm_id: string
          id?: string
          is_verified?: boolean
          rating: number
          review_text: string
          status?: string
          trader_name: string
        }
        Update: {
          claimed_payout?: boolean
          created_at?: string
          firm_id?: string
          id?: string
          is_verified?: boolean
          rating?: number
          review_text?: string
          status?: string
          trader_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "firm_reviews_firm_id_fkey"
            columns: ["firm_id"]
            isOneToOne: false
            referencedRelation: "prop_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      prop_firms: {
        Row: {
          affiliate_url: string
          assets: string[]
          challenge_fee: string
          coupon_code: string
          created_at: string
          deal_type: string
          drawdown_type: string
          evaluation_type: string
          fee_numeric: number
          funding_numeric: number
          id: string
          instrument_list: string[]
          max_account: string
          name: string
          payout_frequency: string
          platforms: string[]
          profit_split: string
          promo_discount: number
          promo_expiry: string | null
          rating: number
          recommended: string
          slug: string
          trustpilot_url: string | null
          updated_at: string
          verdict: string
        }
        Insert: {
          affiliate_url?: string
          assets?: string[]
          challenge_fee?: string
          coupon_code?: string
          created_at?: string
          deal_type?: string
          drawdown_type?: string
          evaluation_type?: string
          fee_numeric?: number
          funding_numeric?: number
          id?: string
          instrument_list?: string[]
          max_account?: string
          name: string
          payout_frequency?: string
          platforms?: string[]
          profit_split?: string
          promo_discount?: number
          promo_expiry?: string | null
          rating?: number
          recommended?: string
          slug: string
          trustpilot_url?: string | null
          updated_at?: string
          verdict?: string
        }
        Update: {
          affiliate_url?: string
          assets?: string[]
          challenge_fee?: string
          coupon_code?: string
          created_at?: string
          deal_type?: string
          drawdown_type?: string
          evaluation_type?: string
          fee_numeric?: number
          funding_numeric?: number
          id?: string
          instrument_list?: string[]
          max_account?: string
          name?: string
          payout_frequency?: string
          platforms?: string[]
          profit_split?: string
          promo_discount?: number
          promo_expiry?: string | null
          rating?: number
          recommended?: string
          slug?: string
          trustpilot_url?: string | null
          updated_at?: string
          verdict?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
