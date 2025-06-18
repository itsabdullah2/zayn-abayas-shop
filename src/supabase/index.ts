import { supabase } from "./client";

import { signInWithPassword } from "./auth/signIn";
import { signUpWithEmail } from "./auth/signUp";
import { signOut } from "./auth/signOut";
import { signInWithOAuth } from "./auth/OAuth";

export {
  supabase,
  signInWithPassword,
  signUpWithEmail,
  signInWithOAuth,
  signOut,
};
