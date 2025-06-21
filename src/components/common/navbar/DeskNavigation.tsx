import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/constants/navLinks";
import { FaSearch, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import CartDropdown from "./CartDropdown";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import {Button} from "@/components/ui/button"

const DeskNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [activeLink, setActiveLink] = useState<string>(pathname);
  const [changeLang, setChangeLang] = useState<string>("en")
  const handleOpenSearchPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.handleOpenSearchPopup
  );

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

const handleLanguageToggle = () => {
  setChangeLang((prev) => prev === "en" ? "ar" : "en")
}

  return (
    <>
      <ul className="hidden md:flex items-center gap-5 text-neutral">
        {navLinks.map((link) => (
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
        <Button className={`text-[17px] text-neutral border border-gray hover:border-light-gray duration-200 ${changeLang === "en" ? "font-noto-kufi" : ""} cursor-pointer`} onClick={handleLanguageToggle}>
          {changeLang === 'en' ? 'العربية' : 'English'}
        </Button>

        <button
          role="button"
          className="cursor-pointer text-neutral hover:text-secondary duration-200"
          onClick={handleOpenSearchPopup}
        >
          <FaSearch size={20} />
        </button>

        <CartDropdown />

        <button
          role="button"
          className="cursor-pointer text-neutral hover:text-secondary duration-200"
        >
          <FaUser size={20} />
        </button>
      </div>
    </>
  );
};

export default DeskNavigation;
