import InputField from "@/components/common/InputField";
import { signInWithPassword } from "@/supabase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      // 1. Sign the user in
      await signInWithPassword(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
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

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            showPassWBtn
            showPasswordFn={handleToggle}
            toggleIcon={showPassword}
            value={formData.password}
            onChange={handleChange}
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
