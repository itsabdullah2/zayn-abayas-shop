import { useState } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Temporary mock data - replace with real data later
  const cartItems = [
    {
      id: "1",
      name: "Cappuccino",
      price: 4.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1534687941688-651ccf1e2c97?w=100",
    },
    {
      id: "2",
      name: "Latte",
      price: 5.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=100",
    },
  ];

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCart = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCart}
        className="flex relative cursor-pointer text-primary md:text-neutral md:hover:text-secondary transition-colors"
      >
        <FaShoppingCart size={20} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50">
          <div className="max-h-96 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-primary">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray">
                          {item.quantity} x ${item.price.toFixed(2)}
                        </p>
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
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Link
                    to="/cart"
                    className="block w-full bg-primary text-white text-center py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    View Cart
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
