import { AuthContext } from "@/context/AuthContext";
import { useContextSelector } from "use-context-selector";
import Notifications from "./Notifications";
import { useEffect, useRef, useState } from "react";
import NotificationItem from "./NotificationItem";
import UserAvatar from "./UserAvatar";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuLayoutDashboard, LuBox } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "@/supabase";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profile = useContextSelector(AuthContext, (ctx) => ctx?.profile);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  const toggleNotifications = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleAvatar = () => {
    setIsAvatarOpen((prev) => !prev);
  };
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const handleLogout = async () => await signOut();

  // Close the dropdown if clicked outside & on Escape key press
  useEffect(() => {
    const closeNotificationsOnClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const closeAvatarOnClickOutside = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target as Node)
      ) {
        setIsAvatarOpen(false);
      }
    };

    const closeOnEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setIsAvatarOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscapeKey);
    document.addEventListener("mousedown", closeAvatarOnClickOutside);
    document.addEventListener("mousedown", closeNotificationsOnClickOutside);
    return () => {
      document.removeEventListener(
        "mousedown",
        closeNotificationsOnClickOutside
      );
      document.removeEventListener("mousedown", closeAvatarOnClickOutside);
    };
  }, []);
  return (
    <>
      <nav className="flex-between py-4 px-3 lg:px-6 border-b border-gray-400 relative max-w-full">
        <div className="flex items-center gap-3">
          <button
            className="sm:hidden cursor-pointer"
            onClick={handleSidebarToggle}
          >
            {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <div className="flex-col gap-1 flex">
            <h2 className="text-base lg:text-xl font-medium text-primary">
              مرحبًا بك في لوحة التحكم,{" "}
              <span className="first-letter:capitalize inline-block">
                {profile?.username}
              </span>
            </h2>
            <p className="text-[0.8em] font-medium">
              إليك ما يحدث مع متجرك اليوم
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Notifications
            onClick={toggleNotifications}
            ref={notificationButtonRef}
          />
          <UserAvatar
            profile={profile!}
            onClick={toggleAvatar}
            isAvatarOpen={isAvatarOpen}
            ref={avatarButtonRef}
          />
        </div>

        {isOpen && (
          <div
            className="bg-neutral py-3 px-4 rounded-md absolute left-10 top-full w-96 shadow-lg border border-gray-300 z-50"
            ref={dropdownRef}
          >
            <h3 className="text-lg font-medium text-primary mb-3 pb-2 border-b border-gray-300">
              الإشعارات
            </h3>

            <NotificationItem onClick={toggleNotifications} />
          </div>
        )}

        {isAvatarOpen && (
          <div
            className="text-left flex flex-col gap-1 absolute left-10 top-full bg-neutral border border-gray-300 py-3 px-4 rounded-md shadow-lg z-50"
            ref={avatarRef}
          >
            <span>{profile?.username}</span>
            <span>{profile?.email}</span>
          </div>
        )}
      </nav>

      <div
        className={`fixed top-20 ${
          isSidebarOpen ? "right-0" : "translate-x-full"
        } w-full px-4 pt-3 pb-5 bg-neutral shadow-lg z-50 transition-all duration-500 sm:hidden flex flex-col gap-10`}
      >
        <h2
          className={`text-2xl font-bold text-primary pb-2 border-b border-light-gray`}
        >
          زين عباءات
        </h2>

        <ul className="flex-1 flex flex-col gap-3 mt-5">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `w-full py-2 px-3 rounded-md flex items-center gap-2 ${
                  isActive ? "bg-primary text-secondary" : ""
                }`
              }
            >
              <LuLayoutDashboard size={22} />
              <span className={``}>لوحة التحكم</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                `w-full py-2 px-3 rounded-md flex items-center gap-2 ${
                  isActive ? "bg-primary text-secondary" : ""
                }`
              }
            >
              <LuBox size={22} />
              <span className={``}>الطلبات</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `w-full py-2 px-3 rounded-md flex items-center gap-2 ${
                  isActive ? "bg-primary text-secondary" : ""
                }`
              }
            >
              <AiFillProduct size={22} />
              <span className={``}>المنتجات</span>
            </NavLink>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className={`auth-btn text-red-800 hover:text-white hover:bg-red-600 text-center flex items-center justify-center gap-2 border border-red-800 hover:border-red-600`}
        >
          <BiLogOut size={22} className="" />
          <span className={``}>تسجيل الخروج</span>
        </button>
      </div>
    </>
  );
};

export default DashboardNavbar;
