import { supabase } from "../client";
import type { SigningResult } from "../types";

export const signInWithPassword = async (
  email: string,
  password: string
): Promise<SigningResult> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Ensure session is properly set
  await supabase.auth.getSession();

  return data;
};
