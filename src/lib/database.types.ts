export interface DurationOption {
  weeks: number;
  price: number;
}

export interface Database {
  public: {
    Tables: {
      packages: {
        Row: {
          id: string;
          name: string;
          price: number;
          num_totes: number;
          rental_weeks: number;
          duration_options: Record<string, DurationOption>;
          features: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          num_totes: number;
          rental_weeks?: number;
          duration_options?: Record<string, DurationOption>;
          features?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          num_totes?: number;
          rental_weeks?: number;
          duration_options?: Record<string, DurationOption>;
          features?: string[];
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          delivery_address: string;
          pickup_address: string;
          delivery_date: string;
          pickup_date: string;
          package_id: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          delivery_address: string;
          pickup_address: string;
          delivery_date: string;
          pickup_date: string;
          package_id: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          delivery_address?: string;
          pickup_address?: string;
          delivery_date?: string;
          pickup_date?: string;
          package_id?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Package = Database['public']['Tables']['packages']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
