import { supabase } from "./client";

import { signInWithPassword } from "./auth/signIn";
import { signUpWithEmail } from "./auth/signUp";
import { signOut } from "./auth/signOut";
import { signInWithOAuth } from "./auth/OAuth";

import { getReviews } from "./db/reviews";
import { addReview } from "./db/reviews";
import { updateReview } from "./db/reviews";

export {
  supabase,
  signInWithPassword,
  signUpWithEmail,
  signInWithOAuth,
  signOut,
  getReviews,
  addReview,
  updateReview,
};
