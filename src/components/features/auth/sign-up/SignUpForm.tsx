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
          إنشاء حساب
        </h2>
        <p className="text-text mb-8">انضم إلى مجتمعنا اليوم</p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <InputField
            label=" الاسم الكامل"
            name="username"
            id="username"
            type="text"
            placeholder="أدخل اسمك الكامل"
            value={formData.username}
            onChange={handleChange}
          />
          <InputField
            label="البريد الإلكتروني"
            name="email"
            id="email"
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="كلمة المرور"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder=" أدخل كلمة المرور"
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
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
            <span className="shine-effect group-hover:animate-shine" />
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <p className="text-center mt-6 text-gray">
          هل لديك حساب بالفعل؟{" "}
          <Link to="/sign-in" className="text-primary/80 hover:text-primary">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
