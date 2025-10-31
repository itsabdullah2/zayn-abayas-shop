import { getProducts, getVariants } from "@/supabase/db/products";
import { PriceFormatter } from "@/utils/formatePrice";
import { useEffect, useState } from "react";

import { IoIosMore } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";

import type { ProductType } from "@/types";
import type { VariantsTableType } from "@/supabase/types";
import { useNavigate } from "react-router-dom";
import { SkeletonCard } from "@/components/common/SkeletonCard";

type EnrichedProductType = ProductType & {
  price?: number;
};

type ProductGridProps = {
  title: string;
  eqCol: string;
  eqVal: string | boolean;
  limit?: number;
};

const ProductGrid = ({ title, eqCol, eqVal, limit }: ProductGridProps) => {
  const [loading, setLoading] = useState(true);
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
          eqCol,
          eqVal,
          limit,
        });

        const enriched = await Promise.all(
          products.map(async (product) => {
            try {
              const variants: VariantsTableType[] = await getVariants({
                productId: product.id,
              });
              const price = variants[0]?.price;
              return { ...product, price };
            } catch {
              return { ...product };
            }
          })
        );

        setData(enriched);
      } catch {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eqCol, eqVal, limit]);

  return (
    <section>
      <h2 className="text-primary font-bold text-3xl mb-5">{title}</h2>
      {loading && (
        <>
          <div className="responsive-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <div className="responsive-grid">
        {data.map((item, i) => (
          <figure
            key={item.id}
            className="card-style group animate-appear"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <picture>
              {/* avif version */}
              <source
                srcSet={`${item.product_img}?quality=80?format=avif`}
                type="image/avif"
              />
              {/* webp version */}
              <source
                srcSet={`${item.product_img}?quality=80?format=webp`}
                type="image/webp"
              />
              <img
                src={item.product_img}
                alt={item.product_name}
                loading="lazy"
                className="object-cover w-full"
              />
            </picture>
            <figcaption className="flex justify-between items-center py-4 px-2">
              <p className="card-title">
                {item.product_name.length > 25
                  ? item.product_name.slice(0, 20) + "..."
                  : item.product_name}
              </p>
              <span className="font-medium text-accentA">
                {item.price
                  ? `ج.م ${PriceFormatter(item.price, "en-EG")}`
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

export default ProductGrid;
