import InputField from "@/components/common/InputField";
import { signUpWithEmail } from "@/supabase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
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

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 1. Sign up the user and get their ID directly
      await signUpWithEmail(
        formData.email,
        formData.password,
        formData.username
      );

      navigate("/sign-in");

      setFormData({
        username: "",
        email: "",
        password: "",
      });
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
          Create Account
        </h2>
        <p className="text-text mb-8">Join our community today</p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="username"
            id="username"
            type="text"
            placeholder="Enter your full name"
            value={formData.username}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your email"
            showPassWBtn
            showPasswordFn={handleToggle}
            toggleIcon={showPassword}
            value={formData.password}
            onChange={handleChange}
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
