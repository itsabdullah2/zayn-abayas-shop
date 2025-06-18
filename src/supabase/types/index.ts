import type { User, Session } from "@supabase/supabase-js";

export type SigningResult = {
  user: User | null;
  session?: Session | null;
};
