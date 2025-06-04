import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/constants/navLinks";
import { FaSearch, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import CartDropdown from "./CartDropdown";

const DeskNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [activeLink, setActiveLink] = useState<string>(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <>
      <ul className="hidden md:flex items-center gap-5 text-txt-light">
        {navLinks.map((link) => (
          <li
            key={link.name}
            className={`text-[1.125rem] ${
              activeLink === link.path
                ? "text-secondary"
                : "text-white hover:text-secondary"
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
          className="cursor-pointer text-txt-light hover:text-secondary duration-200"
        >
          <FaSearch size={20} />
        </button>

        <CartDropdown />

        <button
          role="button"
          className="cursor-pointer text-txt-light hover:text-secondary duration-200"
        >
          <FaUser size={20} />
        </button>
      </div>
    </>
  );
};

export default DeskNavigation;
