import { lazy } from "react";

const SignUp = lazy(() => import("@/components/features/auth/sign-up/"));

const SignUpPage = () => {
  return (
    <div className="flex-1 bg-light-gray">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
