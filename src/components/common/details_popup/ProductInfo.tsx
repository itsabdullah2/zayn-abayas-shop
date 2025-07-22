import useCartData from "@/hooks/useCartData";
import type { ColorsAndSizesType, VariantsTableType } from "@/supabase/types";
import type { ProductType } from "@/types";
import { PriceFormatter } from "@/utils/formatePrice";
import ColorSelection from "../ColorSelection";
import SizeSelection from "../SizeSelection";
import { useState } from "react";

type Props = {
  product: ProductType;
  variants: VariantsTableType[];
  colors: ColorsAndSizesType[];
  sizes: ColorsAndSizesType[];
  close: () => void;
};

const ProductInfo = ({ product, variants, colors, sizes, close }: Props) => {
  const { handleCart } = useCartData();

  // state for selected color and size
  const [selectedColorId, setSelectedColorId] = useState<string>(
    colors[0].id || ""
  );
  const [selectedSizeId, setSelectedSizeId] = useState<string>(
    sizes[0].id || ""
  );
  // Find the current variant based on selection
  const currentVariant = variants.find(
    (v) => v.color_id === selectedColorId && v.size_id === selectedSizeId
  );

  const handleAddToCart = () => {
    if (currentVariant) {
      handleCart?.(currentVariant.id);
      close();
    }
  };

  return (
    <div className="col-span-2">
      <div className="flex flex-col gap-1 pb-2 border-b border-soft-gray">
        <p className="text-text font-sm">{product?.product_desc}</p>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex-1 font-medium text-primary">
          Price:{" "}
          {currentVariant
            ? PriceFormatter(currentVariant.price, "en-EG")
            : "N/A"}{" "}
          E.L
        </div>

        <div className="flex flex-col gap-2">
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

        <button
          className="flex-1 border border-primary primary-btn rounded-none! px-3! h-auto! py-1 text-[15px] relative overflow-hidden group cursor-pointer mt-1"
          onClick={handleAddToCart}
        >
          Add to cart
          <span className="shine-effect group-hover:animate-shine" />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
