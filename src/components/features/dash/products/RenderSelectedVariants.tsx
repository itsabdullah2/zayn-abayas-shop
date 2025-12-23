import { ProductContext } from "@/context/ProductContext";
import React from "react";
import { useContextSelector } from "use-context-selector";

// type Props = {
//   onChange: (e: React.ChangeEvent) => void;
//   sizeValue: string;
//   colorValue: string;
//   stockValue: number;
//   onStockChange: React.Dispatch<React.SetStateAction<number>>;
// };

const RenderSelectedVariants = () => {
  const setVariants = useContextSelector(
    ProductContext,
    (ctx) => ctx?.setVariants
  )!;
  const variants = useContextSelector(ProductContext, (ctx) => ctx?.variants)!;

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-dark-gray w-fit">
        التصنيفات المختارة
      </h3>
      {variants.map((variant, idx) => (
        <>
          <div
            key={`${variant.color_id}-${variant.size_id}`}
            className="flex items-center gap-4 mt-2"
          >
            <span>{variant.size_id}</span>
            <span>{variant.color_id}</span>
          </div>
          <input
            type="number"
            value={variant.stock}
            className=""
            placeholder="أضف الكمية"
            onChange={(e) => {
              const value = Number(e.target.value);
              setVariants((prev) =>
                prev.map((v, i) => (i === idx ? { ...v, stock: value } : v))
              );
            }}
          />
        </>
      ))}
    </div>
  );
};

export default React.memo(RenderSelectedVariants);
