import Loading from "@/components/layout/Loading";
import { supabase } from "@/supabase";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartBtns from "./CartBtns";
import QuantityBtns from "./QuantityBtns";
import ColorSelector from "./ColorSelector";
import Stars from "./Stars";
import Reviews from "./Reviews";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(false);

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
    <section className="section-container flex-1 bg-neutral flex flex-col gap-5 md:gap-10 lg:gap-15 xl:gap-20">
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
          <h4 className="text-2xl text-primary font-">
            {product.product_name}
          </h4>

          <Stars className="text-xl" />

          <div className="flex flex-col mt-2">
            <h4 className="font-medium text-primary text-3xl">
              {PriceFormatter(product.product_price, "en-EG")} L.E
            </h4>

            <ColorSelector />
          </div>

          <QuantityBtns productId={product.id} />
          <CartBtns productId={product.id} />

          <p className="text-text text-[15px]">{product.product_desc}</p>
        </div>
      </div>

        <Reviews />
    </section>
  );
};

export default ProductDetails;
