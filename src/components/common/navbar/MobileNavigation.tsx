import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/constants/navLinks";
import { FaSearch, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import CartDropdown from "./CartDropdown";

const MobileNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [activeLink, setActiveLink] = useState<string>(pathname);
  const setIsNavMenu = useContextSelector(
    AppContext,
    (value) => value?.setIsNavMenu
  )!;

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <div className="flex flex-col gap-5 md:hidden fixed w-full top-16 shadow-md left-0 p-5 bg-white">
      <ul className="flex flex-col gap-5">
        {navLinks.map((link) => (
          <li
            key={link.name}
            className={`text-[1.125rem] ${
              activeLink === link.path
                ? "text-primary"
                : "text-secondary hover:text-primary font-medium"
            } duration-200`}
            onClick={() => setIsNavMenu(false)}
          >
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
      {/* Icons */}
      <div className="flex items-center justify-end gap-5 pt-5 border-t border-secondary">
        <button role="button" className="cursor-pointer text-txt-dark">
          <FaSearch size={20} />
        </button>
        <CartDropdown />
        <button role="button" className="cursor-pointer text-txt-dark">
          <FaUser size={20} />
        </button>
      </div>
    </div>
  );
};

export default MobileNavigation;
