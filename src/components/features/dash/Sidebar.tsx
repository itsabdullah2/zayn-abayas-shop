import { signOut } from "@/supabase";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard, LuBox } from "react-icons/lu";

const Sidebar = () => {
  const handleLogout = async () => await signOut();
  // Add these classes to the sidebar when responsiveness part comes: fixed h-[100dvh] top-0 right-0
  return (
    <aside className="w-64 border-l border-gray-400  py-3 px-2 flex flex-col gap-10">
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
    </aside>
  );
};

export default Sidebar;
