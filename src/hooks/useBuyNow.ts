import { useCallback } from "react";
import useCartData from "./useCartData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useBuyNow = () => {
  const { handleCart } = useCartData();
  const navigate = useNavigate();

  return useCallback(
    async (variantId: string | undefined) => {
      if (!variantId) {
        toast.error("يرجى اختيار اللون والمقاس أولاً", {
          className: "bg-primary! text-neutral! w-fit!",
        });
        return;
      }
      try {
        await handleCart?.(variantId);
        navigate("/checkout");
      } catch (err) {
        toast.error("حدث خطأ أثناء تنفيذ عملية الشراء الفوري.", {
          className: "bg-primary! text-neutral! w-fit!",
        });
      }
    },
    [handleCart, navigate]
  );
};

export default useBuyNow;
