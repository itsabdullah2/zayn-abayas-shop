import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { FaBars, FaTimes } from "react-icons/fa";

import DeskNavigation from "./DeskNavigation";
import MobileNavigation from "./MobileNavigation";
import { AppContext } from "@/context/AppContext";

const Navbar = () => {
  const [sticky, setSticky] = useState<boolean>(false);
  const isNavMenu = useContextSelector(AppContext, (value) => value?.isNavMenu);
  const setIsNavMenu = useContextSelector(
    AppContext,
    (value) => value?.setIsNavMenu
  )!;

  const handleNavMenu = () => {
    setIsNavMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsNavMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleNavbarOnScroll = () => {
      if (window.scrollY >= 10) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleNavbarOnScroll);

    return () => {
      window.removeEventListener("scroll", handleNavbarOnScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full shadow-md transition-all duration-150 ${
        sticky ? "sticky top-0 z-50 bg-primary/90" : "bg-primary"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-neutral">
            زين عباءات
          </Link>

          {/* Desktop Navigation */}
          <DeskNavigation />

          {/* Mobile Navigation */}
          {isNavMenu && <MobileNavigation />}

          <button
            onClick={handleNavMenu}
            className="md:hidden cursor-pointer text-neutral"
          >
            {isNavMenu ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
