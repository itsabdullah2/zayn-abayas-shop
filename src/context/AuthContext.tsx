import { useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { supabase } from "@/supabase/client";
import type { User, Subscription, Session } from "@supabase/supabase-js";
import { getUserProfile } from "@/supabase/db/users";
import type { UserTableType } from "@/supabase/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  profile: UserTableType | null;
  session: Session | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserTableType | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let subscription: Subscription;
    let mounted = true;
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;
        const authUser = session?.user ?? null;
        setUser(authUser);
        setSession(session);

        if (authUser) {
          const profileData = await getUserProfile(authUser.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getInitialSession().then(() => {
      // Listen for auth changes
      const {
        data: { subscription: sub },
      } = supabase.auth.onAuthStateChange(async (_event, session) => {
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

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    profile,
    session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
