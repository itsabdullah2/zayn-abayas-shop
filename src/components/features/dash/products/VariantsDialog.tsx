import { ProductContext } from "@/context/ProductContext";
import { useCloseOnOutsideOrEscape } from "@/hooks/useCloseOnOutsideOrEscape";
import { useGetVariantByProductId } from "@/hooks/useVariants";
import React from "react";
import { useContextSelector } from "use-context-selector";

const VariantsDialog = ({
  productId,
  ref,
}: {
  productId: string;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const { data: variants = [], isLoading } =
    useGetVariantByProductId(productId);

  const handleTargetDialog = useContextSelector(
    ProductContext,
    (ctx) => ctx?.handleTargetDialog,
  )!;

  useCloseOnOutsideOrEscape({
    ref: ref,
    onClose: () => handleTargetDialog(null),
  });

  return (
    <div
      ref={ref}
      className={`w-full bg-light-gray py-3 px-5 rounded-lg absolute left-0 top-[calc(100%+10px)] shadow-md z-10 max-h-50 overflow-y-auto`}
    >
      <ul className="flex flex-col gap-2">
        {isLoading
          ? "Loading..."
          : variants.map((v) => <li key={v.id}>{v.price}</li>)}
      </ul>
    </div>
  );
};

export default React.memo(VariantsDialog);
