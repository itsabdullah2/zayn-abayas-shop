import { useEffect, useRef, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartDropdownItem from "./CartDropdownItem";
import useCartData from "@/hooks/useCartData";

const CartDropdown = () => {
  const { cartProducts, totalItems, totalPrice } = useCartData();
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const closeDropdownOnClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdownOnClickOutside);
    return () =>
      document.removeEventListener("mousedown", closeDropdownOnClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleNavigate = () => {
    navigate("/cart");
    handleToggle();
  };

  return (
    <div className="relative" ref={cartRef}>
      <button
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Toggle cart dropdown"
        className="flex relative cursor-pointer text-primary md:text-neutral hover:text-secondary transition-colors"
      >
        <FaShoppingCart size={20} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 rounded-xl bg-neutral w-80 z-50 py-2 px-2 shadow-lg flex flex-col gap-2">
          <div className="max-h-96 overflow-y-auto">
            {!cartProducts?.length ? (
              <p className="text-center text-gray py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartProducts.map((item) => (
                    <CartDropdownItem key={item.id} item={item} />
                  ))}
                </div>
                <div className="border-t border-gray mt-4 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-accentA">
                      ${totalPrice?.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="primary-btn relative group overflow-hidden w-full cursor-pointer"
                    onClick={handleNavigate}
                  >
                    View Cart
                    <span className="shine-effect group-hover:animate-shine" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
