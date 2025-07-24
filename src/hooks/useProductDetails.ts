import { getColors, getProducts, getSizes, getVariants } from "@/supabase";
import type { ColorsAndSizesType, VariantsTableType } from "@/supabase/types";
import type { ProductType } from "@/types";
import { useEffect, useState } from "react";

const useProductDetails = (id?: string) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [variants, setVariants] = useState<VariantsTableType[]>([]);
  const [colors, setColors] = useState<ColorsAndSizesType[]>([]);
  const [sizes, setSizes] = useState<ColorsAndSizesType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const [productRes, variantsRes, colorsRes, sizesRes] =
          await Promise.all([
            getProducts({ eqCol: "id", eqVal: id }),
            getVariants({ productId: id }),
            getColors(),
            getSizes(),
          ]);

        setProduct(productRes[0]);
        setVariants(variantsRes);
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
  };
};

export default useProductDetails;
