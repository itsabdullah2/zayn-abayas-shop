import { CATEGORY_IDS } from "@/constants";
import { getProducts } from "@/supabase/db/products";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import { useEffect, useState } from "react";

import { IoIosMore } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";

const FeaturedProducts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts({
          eqCol: "category_id",
          eqVal: CATEGORY_IDS.classic,
        });
        setData(products);
      } catch (err) {
        setError("Failed to load featured products, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h2 className="text-primary font-bold text-3xl mb-5">
        Featured Products
      </h2>
      {loading && <p className="text-center text-text">Loading Products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex-1 responsive-grid">
        {data.map((item) => (
          <figure key={item.id} className="card-style group">
            <img
              src={item.product_img}
              alt={item.product_name}
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
              <button className="btn hover:text-accentB duration-200">
                <IoIosMore size={19} />
              </button>
              <button className="btn hover:text-accentB duration-200">
                <FaShoppingCart size={19} />
              </button>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
