import InputField from "@/components/common/InputField";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpForm = ({
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
          Create Account
        </h2>
        <p className="text-text mb-8">Join our community today</p>

        <form className="flex flex-col gap-3">
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
          />
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your email"
            showPassWBtn
            showPasswordFn={handleToggle}
            toggleIcon={showPassword}
          />
          <button
            type="submit"
            disabled={loading}
            className={`relative group overflow-hidden w-full bg-primary text-neutral py-3 rounded-lg font-medium hover:bg-blueberry duration-200 cursor-pointer`}
          >
            {loading ? "Creating Account..." : "Create Account"}
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

        <p className="text-center mt-6 text-gray">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary/80 hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
