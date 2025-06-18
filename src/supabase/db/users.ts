import { supabase } from "../client";
import type { SigningResult } from "../types";

export const getAuthenticatedUser = async (): Promise<SigningResult> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("Not Authenticated");

  return data;
};
