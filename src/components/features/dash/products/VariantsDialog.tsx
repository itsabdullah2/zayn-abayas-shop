import { ProductContext } from "@/context/ProductContext";
import { useCloseOnOutsideOrEscape } from "@/hooks/useCloseOnOutsideOrEscape";
import { useGetProductVariantsViewModel } from "@/hooks/useVariants";
import { translateVariantsOpts } from "@/utils/translateOptsInAddProductPopup";
import React, { useEffect } from "react";
import { useContextSelector } from "use-context-selector";
import StockInput from "./StockInput";

const VariantsDialog = ({
  productId,
  ref,
}: {
  productId: string;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const { data: variantsVM = [], isLoading } =
    useGetProductVariantsViewModel(productId);

  const handleTargetDialog = useContextSelector(
    ProductContext,
    (ctx) => ctx?.handleTargetDialog,
  )!;

  useCloseOnOutsideOrEscape({
    ref: ref,
    onClose: () => handleTargetDialog(null),
  });

  useEffect(() => {
    if (productId) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [productId]);

  return (
    <div
      ref={ref}
      className={`w-full bg-light-gray py-3 rounded-lg absolute left-0 bottom-0 shadow-md z-10 max-h-50 overflow-y-auto`}
    >
      {isLoading ? (
        <p className="text-center py-2 px-4">تحميل قائمة المتغيرات</p>
      ) : (
        <table className="w-full">
          <thead className="">
            <td className="text-primary py-2 px-5 text-sm font-medium">
              المخزون
            </td>
            <td className="text-primary py-2 px-5 text-sm font-medium">
              اللون
            </td>
            <td className="text-primary py-2 px-5 text-sm font-medium">
              الحجم
            </td>
            <td className="text-primary py-2 px-5 text-sm font-medium">
              الحالة
            </td>
          </thead>
          <tbody>
            {variantsVM.map((v) => (
              <tr key={v.id} className={`odd:bg-accent`}>
                <td className="py-1 px-5 text-sm flex items-center gap-2">
                  <StockInput variant={v} onSave={() => {}} />
                </td>
                <td className="py-1 px-5 text-sm">
                  {translateVariantsOpts(v.color.name)}
                </td>
                <td className="py-1 px-5 text-sm">
                  {v.size.name.toUpperCase()}
                </td>
                <td className="py-1 px-5 text-sm">
                  {v.isOutOfStock
                    ? "غير متوفر"
                    : v.isLowStock
                      ? "كمية قليلة"
                      : "متوفر"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default React.memo(VariantsDialog);
