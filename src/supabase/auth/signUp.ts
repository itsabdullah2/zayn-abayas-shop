import { supabase } from "../client";
import type { SigningResult } from "../types";

export const signUpWithEmail = async (
  email: string,
  password: string,
  username: string
): Promise<SigningResult> => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};
