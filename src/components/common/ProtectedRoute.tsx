import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import Loading from "../layout/Loading";

import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const { user, loading } = useContextSelector(AuthContext, (ctx) => ({
    user: ctx?.user,
    loading: ctx?.loading,
  }));

  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-up");
    }
  }, [user, loading, navigate]);

  if (loading || (!user && !loading)) return <Loading />;

  return children;
};

export default ProtectedRoute;
