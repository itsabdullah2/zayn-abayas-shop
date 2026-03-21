import { ProductContext } from "@/context/ProductContext";
import { useCloseOnOutsideOrEscape } from "@/hooks/useCloseOnOutsideOrEscape";
import {
  useGetProductVariantsViewModel,
  useUpdateVariantsInAdminPage,
} from "@/hooks/useVariants";
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
  const variantsMutation = useUpdateVariantsInAdminPage();

  const handleTargetDialog = useContextSelector(
    ProductContext,
    (ctx) => ctx?.handleTargetDialog,
  )!;
  const stockChanges = useContextSelector(
    ProductContext,
    (ctx) => ctx?.stockChanges,
  )!;
  const setStockChanges = useContextSelector(
    ProductContext,
    (ctx) => ctx?.setStockChanges,
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

  const handleSave = async () => {
    const updates = Object.entries(stockChanges).map(([id, stock]) => ({
      id,
      stock,
    }));

    if (!updates.length) return;

    await variantsMutation.mutateAsync(updates);

    setStockChanges({});
  };

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
            <tr>
              <th className="text-primary py-2 px-5 text-sm font-medium">
                المخزون
              </th>
              <th className="text-primary py-2 px-5 text-sm font-medium">
                اللون
              </th>
              <th className="text-primary py-2 px-5 text-sm font-medium">
                الحجم
              </th>
              <th className="text-primary py-2 px-5 text-sm font-medium">
                الحالة
              </th>
            </tr>
          </thead>
          <tbody>
            {variantsVM.map((v) => (
              <tr
                key={v.id}
                className={`odd:bg-white ${v.isOutOfStock ? "bg-red-300/80!" : v.isLowStock ? "bg-yellow-300/80!" : ""}`}
              >
                <td className="py-1 px-5 text-sm flex items-center gap-2">
                  <StockInput variant={v} />
                </td>
                <td className="py-1 px-5 text-sm text-primary">
                  {translateVariantsOpts(v.color.name)}
                </td>
                <td className="py-1 px-5 text-sm text-primary">
                  {v.size.name.toUpperCase()}
                </td>
                <td
                  className={`py-1 px-5 text-sm ${v.isOutOfStock ? "text-red-600" : v.isLowStock ? "text-yellow-600" : "text-primary"}`}
                >
                  {v.isOutOfStock
                    ? `غير متوفر`
                    : v.isLowStock
                      ? "كمية قليلة"
                      : "متوفر"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isLoading ? null : (
        <button
          onClick={handleSave}
          disabled={variantsMutation.isPending}
          className={`mr-5 mt-3 py-1 px-5 border rounded-md ${variantsMutation.isPending ? "text-gray border-gray cursor-auto" : "text-primary border-secondary cursor-pointer"} font-medium`}
        >
          {variantsMutation.isPending ? "يتم الحفظ..." : "حفظ"}
        </button>
      )}
    </div>
  );
};

export default React.memo(VariantsDialog);
