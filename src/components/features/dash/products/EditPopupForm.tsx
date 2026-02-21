import React, { useEffect } from "react";
import { AppContext } from "@/context/AppContext";
// import { FaTimes } from "react-icons/fa";
import { useContextSelector } from "use-context-selector";
import PopupField from "./PopupField";
import uploadImage from "@/assets/upload.png";
import { useUpdateProduct } from "@/hooks/useProducts";
import { useCloseOnOutsideOrEscape } from "@/hooks/useCloseOnOutsideOrEscape";

const EditPopupForm = () => {
  const popupRef = React.useRef<HTMLDivElement | null>(null);
  const productId = useContextSelector(
    AppContext,
    (ctx) => ctx?.isEditPopupForm,
  )!;
  const onCancel = useContextSelector(AppContext, (ctx) => ctx?.handleCancel);
  const editingData = useContextSelector(
    AppContext,
    (ctx) => ctx?.editingData,
  )!;
  const handleEditFieldChange = useContextSelector(
    AppContext,
    (ctx) => ctx?.handleEditFieldChange,
  )!;

  const updateProductMutation = useUpdateProduct();

  const handleSubmitEdits = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProductMutation.mutate();
  };

  // Handle close on outside click or escape key pass
  useCloseOnOutsideOrEscape({
    ref: popupRef,
    onClose: () => onCancel && onCancel(),
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

  return productId ? (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-100" />
      <div
        ref={popupRef}
        className="w-[95vw] sm:w-125 bg-white rounded-xl py-4 px-5 fixed top-1/2 left-1/2 z-200 -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="font-medium text-primary text-lg">قم بتعديل المنتج</h2>

        {/* Popup Fields */}
        <form
          id="editing_form"
          onSubmit={handleSubmitEdits}
          className="flex flex-col gap-2 mt-4"
        >
          <PopupField
            label="تحميل صورة المنتج"
            labelIcon={uploadImage}
            imgName={
              editingData.productImg instanceof File
                ? editingData.productImg.name
                : editingData.productImg
            }
            type="file"
            name="productImg"
            inputVal={editingData.productImg}
            onValChange={handleEditFieldChange}
            inputClasses="hidden"
            isFileInput
          />
          <PopupField
            label="اسم المنتج"
            type="text"
            name="productName"
            placeholder="أدخل اسم المنتج"
            inputVal={editingData.productName}
            onValChange={handleEditFieldChange}
          />
          <PopupField
            label="سعر المنتج"
            type="number"
            name="productPrice"
            placeholder="أدخل سعر المنتج"
            inputVal={editingData.productPrice}
            onValChange={handleEditFieldChange}
          />
          <PopupField
            label="وصف المنتج"
            type="text"
            name="productDesc"
            placeholder="وصف المنتج"
            inputVal={editingData.productDesc}
            onValChange={handleEditFieldChange}
            isTextarea
          />
        </form>

        <div className="items-center flex justify-between mt-7">
          <button
            type="submit"
            form="editing_form"
            className={`cursor-pointer bg-accentA text-neutral rounded-lg px-10 py-1 hover:bg-accentA duration-150`}
            disabled={updateProductMutation.isPending}
          >
            {updateProductMutation.isPending ? "جاري التحديث..." : "تأكيد"}
          </button>
          <button
            className="cursor-pointer border border-accentA rounded-lg px-10 py-1 hover:bg-accentA duration-150 hover:text-white"
            onClick={onCancel}
          >
            الغاء
          </button>
        </div>
        {/* Close button */}
        {/* <button
          className="absolute top-2 left-2 p-1 border border-gray-300 cursor-pointer rounded-md text-gray-400 hover:text-primary hover:border-primary duration-200"
          onClick={onCancel}
        >
          <FaTimes />
        </button> */}
      </div>
    </>
  ) : null;
};

export default EditPopupForm;
