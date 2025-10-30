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
    .upsert(
      {
        id: userId,
        username,
        email,
      },
      { onConflict: "id", ignoreDuplicates: false }
    )
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

export const getUserById = async (
  userIds: string | string[]
): Promise<UserTableType[]> => {
  try {
    if (!userIds || (Array.isArray(userIds) && userIds.length === 0)) return [];

    if (Array.isArray(userIds)) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .in("id", userIds);

      if (error) {
        console.error("Error fetching user by ID:", error);
        return [];
      }

      return data ?? [];
    } else {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userIds);

      if (error) {
        console.error("Error fetching user by ID:", error);
        return [];
      }

      return data ?? [];
    }
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    throw err;
  }
};

export const getUserProfile = async (
  userId: string
): Promise<UserTableType> => {
  try {
    if (!userId) {
      console.error("User ID is required");
    }
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Failed to get the user:", error.message);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Failed to get the user:", err);
    throw err;
  }
};
