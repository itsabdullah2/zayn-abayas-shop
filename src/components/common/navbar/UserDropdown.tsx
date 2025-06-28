import { useEffect, useRef, useState } from "react";
import { FaUser, FaShoppingCart, FaHeart } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { PiSignInBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const UserDropdown = () => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggleUserDropdown = () => setDropdown((prev) => !prev);

  useEffect(() => {
    const closeOnClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        role="button"
        className="cursor-pointer text-primary md:text-neutral hover:text-secondary duration-200"
        onClick={handleToggleUserDropdown}
      >
        <FaUser size={20} />
      </button>

      {dropdown && (
        <div className="absolute right-0 top-11 rounded-xl bg-neutral w-50 z-50 py-2 px-2 shadow-lg flex flex-col gap-2">
          <div className="border-b border-gray-300 pb-2 px-2">
            <p className="font-semibold text-primary">Hello, Abdullah</p>
            <p className="text-sm text-text">abdullah@example.com</p>
          </div>

          <ul className="flex flex-col">
            <MenuItem
              to="/orders"
              icon={<FaShoppingCart size={16} />}
              label="My Orders"
            />
            <MenuItem
              to="/wishlist"
              icon={<FaHeart size={16} />}
              label="Wishlist"
            />
            <MenuItem
              to="/help"
              icon={<IoIosHelpCircle size={16} />}
              label="Help & Support"
            />
          </ul>

          <div className="border-t border-gray-300 pt-2">
            <button className="flex items-center gap-1 w-full text-gray hover:text-primary text-left p-2 hover:bg-light-gray cursor-pointer rounded-md px-2 duration-150">
              <PiSignInBold size={16} /> Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

const MenuItem = ({
  icon,
  label,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
}) => {
  return (
    <li className="text-sm text-gray hover:text-primary px-2 py-2 hover:bg-light-gray rounded-md w-full duration-150">
      <Link to={to} className="flex items-center gap-1 cursor-pointer">
        {icon} {label}
      </Link>
    </li>
  );
};
