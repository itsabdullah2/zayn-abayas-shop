import InputField from "@/components/common/InputField";
import { useState } from "react";

const SignInForm = ({
  loading,
  error,
}: {
  loading?: boolean;
  error?: string;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="p-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <h2 className={`text-large text-primary font-medium mb-2`}>
          Welcome Back
        </h2>
        <p className="text-text mb-8">
          Enter your email and password to access your account
        </p>

        <form className="flex flex-col gap-3">
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            showPassWBtn
            showPasswordFn={handleToggle}
            toggleIcon={showPassword}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" />
              <span className={`ml-2 text-sm text-neutral`}>Remember me</span>
            </label>
            <a href="#" className="text-sm text-purple/80 hover:text-purple">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`relative group overflow-hidden w-full bg-primary text-neutral py-3 rounded-lg font-medium hover:bg-blueberry duration-200 cursor-pointer`}
          >
            {loading ? "Signing In..." : "Sign In"}
            <span className="shine-effect group-hover:animate-shine" />
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="button"
            className={`w-full text-primary py-3 rounded-lg font-medium bg-light-gray hover:bg-light-gray duration-200 flex items-center justify-center cursor-pointer`}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4 mr-2"
            />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
