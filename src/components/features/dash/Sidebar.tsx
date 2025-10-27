import { signOut } from "@/supabase";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard, LuBox } from "react-icons/lu";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize(); // run once on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => await signOut();
  // Add these classes to the sidebar when responsiveness part comes: fixed h-[100dvh] top-0 right-0
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } border-l border-gray-400 py-3 px-2 flex flex-col gap-10 relative transition-all duration-200 ease-in-out`}
    >
      <h1 className="text-2xl font-bold text-primary text-center">
        زين عباءات
      </h1>

      <ul className="flex-1 flex flex-col gap-3">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `w-full py-2 px-3 rounded-md flex items-center gap-2 ${
                isActive ? "bg-primary text-secondary" : ""
              }`
            }
          >
            <LuLayoutDashboard />
            لوحة التحكم
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
            <LuBox />
            الطلبات
          </NavLink>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="auth-btn text-red-800 hover:text-white hover:bg-red-600 text-center justify-center border border-red-800 hover:border-red-600"
      >
        تسجيل الخروج
      </button>

      <button
        className={`absolute -left-3 top-10 bg-neutral w-6 h-6 rounded-full shadow-md cursor-pointer flex-center z-50`}
        onClick={handleToggle}
      >
        <MdOutlineArrowForwardIos
          size={18}
          className={`${
            isOpen ? "" : "-rotate-180"
          } transition-all duration-200`}
        />
      </button>
    </aside>
  );
};

export default Sidebar;
