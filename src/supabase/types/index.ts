import type { User, Session } from "@supabase/supabase-js";

export type SigningResult = {
  user: User | null;
  session?: Session | null;
};

export type CategoriesTableType = {
  id: string;
  category: string;
  created_at: Date;
};
