import Loading from "@/components/layout/Loading";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartBtns from "./CartBtns";
import QuantityBtns from "./QuantityBtns";
import Reviews from "./Reviews";
import { FaStar } from "react-icons/fa";
import { getColors, getProducts, getSizes, getVariants } from "@/supabase";
import type { ColorsAndSizesType, VariantsTableType } from "@/supabase/types";
import ColorSelection from "@/components/common/ColorSelection";
import SizeSelection from "@/components/common/SizeSelection";
import useCartData from "@/hooks/useCartData";
import { useContextSelector } from "use-context-selector";
import { AppContext } from "@/context/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [variants, setVariants] = useState<VariantsTableType[]>([]);
  const [colors, setColors] = useState<ColorsAndSizesType[]>([]);
  const [sizes, setSizes] = useState<ColorsAndSizesType[]>([]);
  const [loading, setLoading] = useState(false);
  const { handleCart } = useCartData();
  const closeProductPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.closeProductPopup
  );

  // state for selected color and size
  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [selectedSizeId, setSelectedSizeId] = useState<string>("");

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

  // Find the current variant based on selection
  const currentVariant = variants.find(
    (v) => v.color_id === selectedColorId && v.size_id === selectedSizeId
  );

  const handleAddToCart = () => {
    if (currentVariant) {
      handleCart?.(currentVariant.id);
      closeProductPopup?.();
    }
  };

  if (loading) return <Loading />;

  if (variants.length === 0 || colors.length === 0 || sizes.length === 0) {
    return <Loading />;
  }

  return (
    <section className="section-container flex-1 bg-neutral flex flex-col gap-5 md:gap-10 lg:gap-15 xl:gap-20">
      <h1 className="text-2xl font-semibold text-primary">تفاصيل المنتج</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        <div className="lg:col-span-1">
          <img
            src={product?.product_img}
            alt={product?.product_name}
            className="rounded-lg"
          />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-5">
          <h4 className="text-2xl text-primary font-">
            {product?.product_name}
          </h4>

          <div className="flex items-center gap-1 text-xl -mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="text-soft-gray" />
            ))}
          </div>

          <div className="flex flex-col mt-2">
            <h4 className="font-medium text-primary text-3xl">
              {PriceFormatter(variants[0]?.price, "en-EG")} L.E
            </h4>

            <div className="flex gap-3 mt-5">
              <ColorSelection
                colors={colors}
                selectedColorId={selectedColorId}
                onColorChange={setSelectedColorId}
              />
              <SizeSelection
                sizes={sizes}
                selectedSizeId={selectedSizeId}
                onSizeChange={setSelectedSizeId}
              />
            </div>
          </div>

          <QuantityBtns variantId={variants[0]?.id} />
          <CartBtns handleAddToCart={handleAddToCart} />

          <p className="text-text text-[15px]">{product?.product_desc}</p>
        </div>
      </div>

      {product?.id && <Reviews productId={product.id} />}
    </section>
  );
};

export default ProductDetails;
