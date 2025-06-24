import { AppContext } from "@/context/AppContext";
import { getCartItems, getProducts } from "@/supabase/db/products";
import type { ProductType } from "@/types";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContextSelector } from "use-context-selector";

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  const cartRef = useRef<HTMLDivElement | null>(null);

  const setProductsIds = useContextSelector(
    AppContext,
    (ctx) => ctx?.setProductsIds
  )!;
  const productsIds = useContextSelector(AppContext, (ctx) => ctx?.productsIds);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const data = await getCartItems();

      const ids = data.map((item) => item.product_id);
      setProductsIds(ids);
    };

    fetchCartItems();
  }, [setProductsIds]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getProducts({ inCol: "id", inVal: productsIds });

      setCartItems(result);
    };

    fetchProducts();
  }, [productsIds]);

  useEffect(() => {
    const closeDropdownOnClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdownOnClickOutside);
    return () =>
      document.removeEventListener("mousedown", closeDropdownOnClickOutside);
  });

  // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  // const totalPrice = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  return (
    <div className="relative" ref={cartRef}>
      <button
        onClick={handleToggle}
        className="flex relative cursor-pointer text-primary md:text-neutral hover:text-secondary transition-colors"
      >
        <FaShoppingCart size={20} />
        {/* {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )} */}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 rounded-xl bg-neutral w-80 z-50 py-2 px-2 shadow-lg flex flex-col gap-2">
          <div className="max-h-96 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.product_img}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-primary">
                          {item.product_name}
                        </h3>
                        {/* <p className="text-sm text-gray">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p> */}
                      </div>
                      <button className="text-red-500 hover:text-red-700 cursor-pointer">
                        <FaTrash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-secondary mt-4 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold text-primary">
                      {/* ${totalPrice.toFixed(2)} */} 15
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="primary-btn relative group overflow-hidden"
                  >
                    View Cart
                    <span className="shine-effect group-hover:animate-shine" />
                  </Link>
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
