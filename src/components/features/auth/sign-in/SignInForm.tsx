import InputField from "@/components/common/InputField";
import { signInWithPassword } from "@/supabase";
import {
  createUser,
  getAuthenticatedUser,
  getUserById,
} from "@/supabase/db/users";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

      const { user: signedInUser } = await getAuthenticatedUser();
      const username = signedInUser?.user_metadata?.username;
      if (signedInUser && username) {
        await createUser(signedInUser.id, username, formData.email);
      }

      if (signedInUser) {
        const res = await getUserById(signedInUser.id);
        const profile = res[0];

        // Redirect to Dashboard if the role is admin otherwise to the store
        if (profile?.role === "admin") {
          // navigate("/admin/dashboard");
          window.location.href = "/admin/dashboard";
        } else {
          navigate("/");
        }
      }
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
          مرحبًا بعودتك
        </h2>
        <p className="text-text mb-8">
          أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى حسابك
        </p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <InputField
            label="البريد الإلكتروني"
            type="email"
            id="email"
            name="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="كلمة المرور"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="أدخل كلمة المرور"
            showPassWBtn
            showPasswordFn={handleToggle}
            toggleIcon={showPassword}
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1">
              <input type="checkbox" />
              <span className={`ml-2 text-sm text-primary`}>تذكرني</span>
            </label>
            <a href="#" className="text-sm text-purple/80 hover:text-purple">
              هل نسيت كلمة المرور؟
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`relative group overflow-hidden w-full bg-primary text-neutral py-3 rounded-lg font-medium hover:bg-blueberry duration-200 cursor-pointer`}
          >
            {loading ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            <span className="shine-effect group-hover:animate-shine" />
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <p className="text-center mt-6 text-gray">
          لا تملك حساباٌ؟{" "}
          <Link to="/sign-up" className="text-primary/80 hover:text-primary">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
