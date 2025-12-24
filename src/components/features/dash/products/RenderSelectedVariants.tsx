import { ProductContext } from "@/context/ProductContext";
import { getSizeName, getColorName } from "@/utils/getVariantName";
import { translateVariantsOpts } from "@/utils/translateOptsInAddProductPopup";
import React from "react";
import { useContextSelector } from "use-context-selector";

type Props = {
  sizes: { id: string; name: string; created_at: Date }[];
  colors: { id: string; name: string; created_at: Date }[];
};

const RenderSelectedVariants = ({ sizes, colors }: Props) => {
  const setVariants = useContextSelector(
    ProductContext,
    (ctx) => ctx?.setVariants
  )!;
  const variants = useContextSelector(ProductContext, (ctx) => ctx?.variants)!;

  return variants.length ? (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-dark-gray w-fit">
        التصنيفات المختارة
      </h3>
      <div className="flex flex-col gap-2 max-h-43 overflow-y-auto">
        {variants.map((variant, idx) => (
          <div
            key={`${variant.color_id}-${variant.size_id}`}
            className="flex items-center flex-row-reverse gap-2 justify-between"
          >
            <div className="flex items-center gap-4 mt-2">
              <span>{getSizeName(variant.size_id, sizes).toUpperCase()}</span>{" "}
              {" - "}
              <span>
                {translateVariantsOpts(getColorName(variant.color_id, colors))}
              </span>
            </div>
            <input
              type="number"
              value={variant.stock}
              className="border border-dark-gray py-2 px-1 rounded-sm"
              placeholder="أضف الكمية"
              onChange={(e) => {
                const value = Number(e.target.value);
                setVariants((prev) =>
                  prev.map((v, i) => (i === idx ? { ...v, stock: value } : v))
                );
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default React.memo(RenderSelectedVariants);
