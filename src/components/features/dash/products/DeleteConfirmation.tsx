import { deleteProduct, deleteVariants } from "@/supabase";
import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { toast } from "sonner";

type Props = {
  productId: string | null;
  onCancel: () => void;
};

const DeleteConfirmation = ({ productId, onCancel }: Props) => {
  const handleDeleteProduct = async (productId: string) => {
    if (productId) {
      await deleteProduct(productId);
      await deleteVariants(productId);
    }
    console.log("Product deleted successfully:", productId);
    onCancel();
  };

  return productId ? (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-100" />
      <div className="w-[95vw] sm:w-[500px] bg-white rounded-xl py-4 px-5 fixed top-1/2 left-1/2 z-200 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-4 mb-5">
          <MdErrorOutline size={50} className="text-red-500" />
          <h2 className="text-base text-primary font-medium pb-3">
            هل أنت متأكد من مسح المنتج؟
          </h2>
        </div>
        <div className="flex items-center justify-between gap-5">
          <button
            className="cursor-pointer border border-accentA rounded-lg px-10 py-1 hover:bg-accentA duration-150 hover:text-white"
            onClick={() => {
              productId ? handleDeleteProduct(productId) : undefined;
              toast.success("تم حذف المنتج بنجاح");
            }}
          >
            تأكيد
          </button>
          <button
            className="cursor-pointer bg-accentA text-neutral rounded-lg px-10 py-1 hover:bg-accentA duration-150"
            onClick={onCancel}
          >
            الغاء
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default React.memo(DeleteConfirmation);
