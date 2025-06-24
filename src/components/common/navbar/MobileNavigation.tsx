import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "@/constants";
import { FaSearch, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import CartDropdown from "./CartDropdown";
import UserDropdown from "./UserDropdown";

const MobileNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [activeLink, setActiveLink] = useState<string>(pathname);
  const setIsNavMenu = useContextSelector(
    AppContext,
    (value) => value?.setIsNavMenu
  )!;
  const openSearchPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.handleOpenSearchPopup
  )!;

  const handleOpenSearchPopup = () => {
    openSearchPopup();
    setIsNavMenu(false);
  };

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <div className="flex flex-col gap-5 md:hidden fixed w-full top-16 shadow-md left-0 p-5 bg-white z-30">
      <ul className="flex flex-col gap-5">
        {NAV_LINKS.map((link) => (
          <li
            key={link.name}
            className={`text-[1.125rem] ${
              activeLink === link.path
                ? "text-secondary"
                : "text-primary hover:text-secondary font-medium"
            } duration-200`}
            onClick={() => setIsNavMenu(false)}
          >
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
      {/* Icons */}
      <div className="flex items-center justify-end gap-5 pt-5 border-t border-primary/40">
        <button
          role="button"
          className="cursor-pointer text-primary hover:text-secondary duration-200"
          onClick={handleOpenSearchPopup}
        >
          <FaSearch size={20} />
        </button>
        <CartDropdown />
        <UserDropdown />
      </div>
    </div>
  );
};

export default MobileNavigation;
