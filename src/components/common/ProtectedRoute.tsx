import { AuthContext } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import Loading from "../layout/Loading";

import { useEffect } from "react";

const ProtectedRoute = ({
  children,
  role = "customer",
}: {
  children: React.ReactNode;
  role: "customer" | "admin";
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useContextSelector(AuthContext, (ctx) => ctx?.user);
  const profile = useContextSelector(AuthContext, (ctx) => ctx?.profile);
  const loading = useContextSelector(AuthContext, (ctx) => ctx?.loading);

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
      if (
        profile?.role === "customer" &&
        location.pathname.startsWith("/admin")
      ) {
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
