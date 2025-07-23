import { AuthContext } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { signOut } from "@/supabase/auth/signOut";

const UserDropdown = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContextSelector(AuthContext, (ctx) => ({
    user: ctx?.user,
    isAuthenticated: ctx?.isAuthenticated,
  }));

  const username = user?.user_metadata?.username;
  const email = user?.user_metadata?.email;

  const handleToggleUserDropdown = () => setDropdown((prev) => !prev);
  const handleNavigate = () => {
    navigate("/sign-up");
    handleToggleUserDropdown();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setDropdown(false);
    } catch (error) {
      // Optionally handle error (e.g., show toast)
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const closeOnClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        role="button"
        className="cursor-pointer text-primary md:text-neutral hover:text-secondary duration-200"
        onClick={handleToggleUserDropdown}
      >
        <FaUser size={20} />
      </button>

      {dropdown && (
        <div className="absolute left-0 top-11 rounded-xl bg-neutral w-60 z-50 py-2 px-2 shadow-lg flex flex-col gap-2">
          {isAuthenticated && (
            <div className="border-b border-gray-300 pb-2 px-2">
              <p className="font-semibold text-primary">
                Hello,{" "}
                <span className="">
                  {username.slice(0, 1).toUpperCase() + username.slice(1)}
                </span>
              </p>
              <p className="text-sm text-text">{email}</p>
            </div>
          )}

          <ul className="flex flex-col">
            <MenuItem
              to="/orders"
              icon={<FaShoppingCart size={16} />}
              label="طلباتي"
            />
            <MenuItem
              to="/wishlist"
              icon={<FaHeart size={16} />}
              label="قائمة الرغبات"
            />
            <MenuItem
              to="/help"
              icon={<IoIosHelpCircle size={16} />}
              label="المساعدة والدعم"
            />
          </ul>

          <div className="border-t border-gray-300 pt-2">
            {isAuthenticated ? (
              <button
                className="auth-btn text-red-800 hover:text-white hover:bg-red-600"
                onClick={handleLogout}
              >
                <PiSignOutBold size={16} /> تسجيل الخروج
              </button>
            ) : (
              <button
                className="auth-btn text-gray hover:text-primary hover:bg-light-gray"
                onClick={handleNavigate}
              >
                <PiSignInBold size={16} /> تسجيل
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

const MenuItem = ({
  icon,
  label,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
}) => {
  return (
    <li className="text-sm text-gray hover:text-primary px-2 py-2 hover:bg-light-gray rounded-md w-full duration-150">
      <Link to={to} className="flex items-center gap-1 cursor-pointer">
        {icon} {label}
      </Link>
    </li>
  );
};
