import Loading from "@/components/layout/Loading";
import useCartData from "@/hooks/useCartData";
import { supabase } from "@/supabase";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(false);
  const { handleCart } = useCartData();
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [color, setColor] = useState("white");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw new Error(error.message);
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) {
    return (
      <div className="text-center py-8">
        <p className="text-2xl text-text">Product Not Found!</p>
      </div>
    );
  }

  return (
    <section className="section-container flex-1 bg-neutral">
      <h1 className="text-2xl font-semibold text-primary">Product Details</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        <div className="lg:col-span-1">
          <img
            src={product.product_img}
            alt={product.product_name}
            className="rounded-lg"
          />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h4 className="text-2xl text-primary">{product.product_name}</h4>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const star = i + 1;
                return (
                  <FaStar
                    key={i}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => {
                      setRating(star);
                      // Send to the backend
                    }}
                    className={`${
                      star <= (hover || rating)
                        ? "text-yellow-400"
                        : "text-gray-400"
                    } cursor-pointer duration-200`}
                  />
                );
              })}
            </div>

            <div className="flex flex-col mt-2">
              <h4 className="font-medium text-primary text-3xl">
                {PriceFormatter(product.product_price, "en-EG")} L.E
              </h4>

              <div className="flex items-center gap-1 mt-4">
                <button
                  className="h-4 w-4 border border-primary rounded-full p-[2px] cursor-pointer"
                  onClick={() => setColor("white")}
                >
                  <span className="bg-primary h-full w-full block rounded-full" />
                </button>
                <button
                  className="h-4 w-4 border border-primary rounded-full p-[2px] cursor-pointer"
                  onClick={() => setColor("black")}
                >
                  <span className="bg-primary h-full w-full block rounded-full" />
                </button>
              </div>
            </div>
            <p className="text-text text-[15px]">{product.product_desc}</p>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  className="primary-btn px-3! h-auto! py-1 text-[15px] relative overflow-hidden group cursor-pointer"
                  onClick={() => handleCart?.(product.id)}
                >
                  Add to cart
                  <span className="shine-effect group-hover:animate-shine" />
                </button>
                <button className="primary-btn px-3! h-auto! py-1 text-[15px] relative overflow-hidden group cursor-pointer">
                  Add to wishlist
                  <span className="shine-effect group-hover:animate-shine" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
