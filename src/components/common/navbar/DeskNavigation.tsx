import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "@/constants";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import CartDropdown from "./CartDropdown";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import UserDropdown from "./UserDropdown";

const DeskNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [activeLink, setActiveLink] = useState<string>(pathname);
  const handleOpenSearchPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.handleOpenSearchPopup
  );

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <>
      <ul className="hidden md:flex items-center gap-5 text-neutral">
        {NAV_LINKS.map((link) => (
          <li
            key={link.name}
            className={`text-[1.125rem] ${
              activeLink === link.path
                ? "text-secondary"
                : "text-neutral hover:text-secondary"
            } duration-200`}
          >
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
      {/* Icons */}
      <div className="hidden md:flex items-center gap-5">
        <button
          role="button"
          className="cursor-pointer text-neutral hover:text-secondary duration-200"
          onClick={handleOpenSearchPopup}
        >
          <FaSearch size={20} />
        </button>

        <CartDropdown />

        <UserDropdown />
      </div>
    </>
  );
};

export default DeskNavigation;
