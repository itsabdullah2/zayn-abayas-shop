import type { Provider } from "@supabase/supabase-js";
import { supabase } from "../client";

type OAuthResult = {
  provider: Provider;
  url: string | null;
};

export const signInWithOAuth = async (): Promise<OAuthResult> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) throw new Error(error.message);

  return data;
};
