import { signOut } from "@/supabase";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard, LuBox } from "react-icons/lu";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import React from "react";
import { useContextSelector } from "use-context-selector";
import { SidebarContext } from "@/context/SidebarContext";

const Sidebar = ({ className }: { className?: string }) => {
  const isOpen = useContextSelector(SidebarContext, (ctx) => ctx?.isOpen);
  const handleToggle = useContextSelector(
    SidebarContext,
    (ctx) => ctx?.handleToggle
  );

  const handleLogout = async () => await signOut();

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-light-gray border-l border-gray-400 py-3 px-2 hidden sm:flex flex-col gap-10 relative transition-all duration-200 ease-in-out z-[100] ${className}`}
    >
      <h1 className={`text-2xl font-bold text-primary text-center`}>
        زين <span className={`${isOpen ? "" : "hidden"}`}>عباءات</span>
      </h1>

      <ul className="flex-1 flex flex-col gap-3">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `w-full py-2 px-3 rounded-md flex items-center gap-2 ${
                isActive ? "bg-primary text-secondary" : ""
              } ${isOpen ? "" : "justify-center"}`
            }
          >
            <LuLayoutDashboard size={22} />
            <span className={`${isOpen ? "" : "hidden"}`}>لوحة التحكم</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `w-full py-2 px-3 rounded-md flex items-center gap-2 ${
                isActive ? "bg-primary text-secondary" : ""
              } ${isOpen ? "" : "justify-center"}`
            }
          >
            <LuBox size={22} />
            <span className={`${isOpen ? "" : "hidden"}`}>الطلبات</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `w-full py-2 px-3 rounded-md flex items-center gap-2 ${
                isActive ? "bg-primary text-secondary" : ""
              } ${isOpen ? "" : "justify-center"}`
            }
          >
            <AiFillProduct size={22} />
            <span className={`${isOpen ? "" : "hidden"}`}>المنتجات</span>
          </NavLink>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className={`auth-btn text-red-800 hover:text-white hover:bg-red-600 text-center flex items-center ${
          isOpen ? "" : "justify-center"
        } gap-2 border border-red-800 hover:border-red-600`}
      >
        <BiLogOut size={22} className="" />
        <span className={`${isOpen ? "" : "hidden"}`}>تسجيل الخروج</span>
      </button>

      <button
        className={`absolute -left-3 top-10 bg-neutral w-6 h-6 rounded-full shadow-md cursor-pointer flex-center z-[100]`}
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

export default React.memo(Sidebar);
