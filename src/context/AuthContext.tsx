import { useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { supabase } from "@/supabase/client";
import type { User, Subscription } from "@supabase/supabase-js";
import { getUserProfile } from "@/supabase/db/users";
import type { UserTableType } from "@/supabase/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  profile: UserTableType | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserTableType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: Subscription | undefined;
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const authUser = session?.user ?? null;
        setUser(authUser);

        if (authUser) {
          const profileData = await getUserProfile(authUser.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession().then(() => {
      // Listen for auth changes
      const {
        data: { subscription: sub },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setLoading(true);
        const newUser = session?.user ?? null;
        setUser(newUser);

        if (newUser) {
          const profileData = await getUserProfile(newUser.id);
          setProfile(profileData);
        } else {
          setProfile(null);
        }

        setLoading(false);
      });
      subscription = sub;
    });

    return () => subscription?.unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    profile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
