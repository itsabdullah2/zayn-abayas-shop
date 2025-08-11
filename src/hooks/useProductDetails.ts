import {
  getColors,
  getProducts,
  getReviews,
  getSizes,
  getVariants,
} from "@/supabase";
import type {
  ColorsAndSizesType,
  ReviewsTableType,
  VariantsTableType,
} from "@/supabase/types";
import type { ProductType } from "@/types";
import { useEffect, useState } from "react";

const useProductDetails = (id?: string) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [variants, setVariants] = useState<VariantsTableType[]>([]);
  const [colors, setColors] = useState<ColorsAndSizesType[]>([]);
  const [reviews, setReviews] = useState<ReviewsTableType[]>([]);
  const [sizes, setSizes] = useState<ColorsAndSizesType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const [productRes, variantsRes, reviewsRes, colorsRes, sizesRes] =
          await Promise.all([
            getProducts({ eqCol: "id", eqVal: id }),
            getVariants({ productId: id }),
            getReviews(id ?? ""),
            getColors(),
            getSizes(),
          ]);

        setProduct(productRes[0]);
        setVariants(variantsRes);
        setReviews(reviewsRes);
        setColors(colorsRes);
        setSizes(sizesRes);
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  return {
    product,
    variants,
    colors,
    sizes,
    loading,
    reviews,
  };
};

export default useProductDetails;
