import { supabase } from "../client";
import type { SigningResult, UserTableType } from "../types";

type UserOpts = {
  limit?: number;
  eqCol?: string;
  eqVal?: string | boolean;
  inCol?: string;
  inVal?: string[];
};

export const getAuthenticatedUser = async (): Promise<SigningResult> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("Not Authenticated");

  return data;
};

export const createUser = async (
  userId: string,
  username: string,
  email: string
) => {
  if (!userId) throw new Error("User ID is required to create a user.");
  if (!username || !email) throw new Error("Username and email are required.");

  const { data, error } = await supabase
    .from("users")
    .insert({
      id: userId,
      username,
      email,
    })
    .single();

  if (error) throw new Error(`Failed to insert user: ${error.message}`);

  return data;
};

export const getUsers = async <T = UserTableType>(
  options: UserOpts = {},
  column: string = "*"
): Promise<T[]> => {
  const { limit, eqCol, eqVal, inCol, inVal } = options;

  let query = supabase.from("users").select(column);
  if (limit) query = query.limit(limit);
  if (eqVal && eqCol) query = query.eq(eqCol, eqVal);
  if (inCol && inVal) query = query.in(inCol, inVal);

  const { data, error } = await supabase.from("users").select(column);

  if (error) {
    console.error("Failed to fetch users:", error.message);
    throw new Error(error.message);
  }
  if (!data || data.length === 0) {
    throw new Error("No Users Found");
  }

  return data as T[];
};
