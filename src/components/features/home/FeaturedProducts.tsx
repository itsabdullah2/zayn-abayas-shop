import { CATEGORY_IDS } from "@/constants";
import { getProducts, getVariants } from "@/supabase/db/products";
import { PriceFormatter } from "@/utils/formatePrice";
import { useEffect, useState } from "react";

import { IoIosMore } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";
import type { ProductType } from "@/types";
import { useNavigate } from "react-router-dom";
import type { VariantsTableType } from "@/supabase/types";

type EnrichedProductType = ProductType & {
  price?: number;
};

const FeaturedProducts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EnrichedProductType[]>([]);

  const openProductPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.openProductPopup
  )!;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts({
          eqCol: "category_id",
          eqVal: CATEGORY_IDS.classic,
        });

        // Enrich product with their first variant's price
        const enriched: EnrichedProductType[] = await Promise.all(
          products.map(async (product) => {
            try {
              const variants: VariantsTableType[] = await getVariants({
                productId: product.id,
              });
              const price = variants[0]?.price;
              return { ...product, price };
            } catch (err) {
              return { ...product };
            }
          })
        );

        setData(enriched);
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
        {data.map((item, i) => (
          <figure
            key={item.id}
            className="card-style group animate-appear"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <img
              src={item.product_img}
              alt={item.product_name}
              loading="lazy"
              className="w-full"
            />
            <figcaption className="flex justify-between gap-2 items-center py-4 px-2">
              <p className="card-title">
                {item.product_name.length > 25
                  ? item.product_name.slice(0, 25) + "..."
                  : item.product_name}
              </p>
              <span className="font-medium text-accentA">
                {item.price
                  ? `${PriceFormatter(item.price, "en-EG")} L.E`
                  : "N/A"}
              </span>
            </figcaption>

            <div className="action-btns group-hover:top-2">
              <button
                className="btn hover:text-accentB duration-200"
                onClick={() => navigate(`products/${item.id}`)}
              >
                <IoIosMore size={19} />
              </button>
              <button
                className="btn hover:text-accentB duration-200"
                onClick={() => openProductPopup(item.id)}
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

export default FeaturedProducts;
