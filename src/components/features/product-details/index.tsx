import Loading from "@/components/layout/Loading";
import { supabase } from "@/supabase";
import type { ProductType } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  return <div>{product.product_name}</div>;
};

export default ProductDetails;
