import { lazy } from "react";

const SignIn = lazy(() => import("@/components/features/auth/sign-in/"));

const SignInPage = () => {
  return (
    <div className="flex-1 bg-light-gray">
      <SignIn />
    </div>
  );
};

export default SignInPage;
