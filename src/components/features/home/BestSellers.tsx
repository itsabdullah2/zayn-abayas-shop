import { getProducts } from "@/supabase/db/products";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import { useEffect, useState } from "react";

const BestSellers = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bestSellers, setBestSellers] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const products = await getProducts({
          eqCol: "is_best_seller",
          eqVal: true,
        });
        setBestSellers(products);
      } catch (err) {
        setError("Failed to load featured products. Please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="">
      <h2 className="text-primary font-bold text-3xl mb-5">Best Sellers</h2>
      {loading && <p className="text-center text-text">Loading Products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="responsive-grid">
        {bestSellers.map((item) => (
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
              <button className="btn">D</button>
              <button className="btn">C</button>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
