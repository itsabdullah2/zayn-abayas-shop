import { AppContext } from "@/context/AppContext";
import { getProducts } from "@/supabase/db/products";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { useContextSelector } from "use-context-selector";

const NewArrivals = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newArrivals, setNewArrivals] = useState<ProductType[]>([]);
  const openProductPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.openProductPopup
  )!;
  const handleCart = useContextSelector(AppContext, (ctx) => ctx?.handleCart);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const products = await getProducts({
          limit: 4,
          eqCol: "is_best_sellers",
          eqVal: false,
        });
        setNewArrivals(products);
      } catch (err) {
        setError("Failed to load new arrivals products. Please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section>
      <h2 className="text-primary font-bold text-3xl mb-5">New Arrivals</h2>
      {loading && <p className="text-center text-text">Loading Products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="responsive-grid">
        {newArrivals.map((item) => (
          <figure key={item.id} className="card-style group">
            <img
              src={item.product_img}
              alt={item.product_name}
              loading="lazy"
              className="w-full sm:w-[400px]"
            />
            <figcaption className="flex justify-between items-center py-4 px-2">
              <p className="card-title">
                {item.product_name.length > 25
                  ? item.product_name.slice(0, 25) + "..."
                  : item.product_name}
              </p>
              <span className="font-medium text-accentA">
                {PriceFormatter(item.product_price, "en-EG")} L.E
              </span>
            </figcaption>

            <div className="action-btns group-hover:top-2">
              <button
                className="btn hover:text-accentB duration-200"
                onClick={() => openProductPopup(item.id)}
              >
                <IoIosMore size={19} />
              </button>
              <button
                className="btn hover:text-accentB duration-200"
                onClick={() => handleCart && handleCart(item.id)}
              >
                <FaShoppingCart size={19} />
              </button>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
