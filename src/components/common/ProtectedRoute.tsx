import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import Loading from "../layout/Loading";

import { useEffect } from "react";

const ProtectedRoute = ({
  children,
  role = "user",
}: {
  children: React.ReactNode;
  role?: "user" | "admin";
}) => {
  const navigate = useNavigate();

  const { user, loading, profile } = useContextSelector(AuthContext, (ctx) => ({
    user: ctx?.user,
    loading: ctx?.loading,
    profile: ctx?.profile,
  }));

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/sign-up");
        return;
      }
      // Admin should only access admin /admin/*
      if (
        profile?.role === "admin" &&
        !location.pathname.startsWith("/admin")
      ) {
        navigate("/admin/dashboard");
        return;
      }
      // User should not access admin /admin/*
      if (profile?.role === "user" && location.pathname.startsWith("/admin")) {
        navigate("/");
        return;
      }

      // if role is explicitly required
      if (role && profile?.role !== role) {
        navigate("/");
        return;
      }
    }
  }, [user, loading, navigate, role, profile]);

  if (loading || (!user && !loading)) return <Loading />;

  return children;
};

export default ProtectedRoute;
