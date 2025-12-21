import { memo, useRef } from "react";
import PopupField from "./PopupField";
import uploadImage from "@/assets/upload.png";
import { useContextSelector } from "use-context-selector";
import { ProductContext, type TProductData } from "@/context/ProductContext";
import { useCloseOnOutsideOrEscape } from "@/hooks/useCloseOnOutsideOrEscape";
import PopupDropdown from "./PopupDropdown";
import { useCategories } from "@/hooks/useCategories";
import { useColors, useSizes } from "@/hooks/useVariants";
import DropdownSelection from "./DropdownSelection";

type Props = {
  isNewProduct: boolean;
  setProductChange: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
};

const INITIAL_STATE: TProductData = {
  productName: "",
  productPrice: 0,
  productDesc: "",
  productImg: "",
  categoryId: "",
  variants: {
    color: "",
    size: "",
  },
  productStock: 0,
};

const AddNewProduct = ({
  isNewProduct,
  setProductChange,
  onSubmit,
  isPending,
}: Props) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const { data: categories } = useCategories();
  const { data: colors } = useColors();
  const { data: sizes } = useSizes();

  const newProductData = useContextSelector(
    ProductContext,
    (ctx) => ctx?.newProductData
  )!;
  const setNewProductData = useContextSelector(
    ProductContext,
    (ctx) => ctx?.setNewProductData
  )!;
  const handleFieldChange = useContextSelector(
    ProductContext,
    (ctx) => ctx?.handleFieldChange
  )!;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setNewProductData((prev) => ({
      ...prev,
      categoryId: e.target.value,
    }));
  const handleVariantChange =
    (k: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      setNewProductData((prev) => ({
        ...prev,
        variants: {
          ...prev.variants,
          [k]: e.target.value,
        },
      }));
    };

  const handleClose = () => {
    setProductChange(false);
    setNewProductData(INITIAL_STATE);
  };

  // Handle close on outside click or escape key pass
  useCloseOnOutsideOrEscape({
    ref: popupRef,
    onClose: handleClose,
  });

  return isNewProduct ? (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-100" />
      <div
        ref={popupRef}
        className="w-[95vw] sm:w-125 bg-white rounded-xl py-4 px-5 fixed top-1/2 left-1/2 z-200 -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="font-medium text-primary text-lg">
          قم بإضافة منتج جديد
        </h2>
        {/* Popup Fields */}
        <form
          id="adding_form"
          className="flex flex-col gap-2 mt-4 h-[65vh] overflow-y-auto"
          onSubmit={onSubmit}
        >
          <PopupField
            label="تحميل صورة المنتج"
            labelIcon={uploadImage}
            imgName={
              newProductData.productImg instanceof File
                ? newProductData.productImg.name
                : newProductData.productImg
            }
            type="file"
            name="productImg"
            inputVal={newProductData?.productImg}
            onValChange={handleFieldChange}
            inputClasses="hidden"
            isFileInput
          />
          <PopupField
            label="اسم المنتج"
            type="text"
            name="productName"
            placeholder="أدخل اسم المنتج"
            inputVal={newProductData?.productName}
            onValChange={handleFieldChange}
          />
          <PopupField
            label="سعر المنتج"
            type="number"
            name="productPrice"
            placeholder="أدخل سعر المنتج"
            inputVal={newProductData?.productPrice}
            onValChange={handleFieldChange}
          />
          <PopupField
            label="مخزون المنتج"
            type="number"
            name="productStock"
            placeholder="أدخل مخزون المنتج"
            inputVal={newProductData?.productStock}
            onValChange={handleFieldChange}
          />
          <PopupField
            label="وصف المنتج"
            type="text"
            name="productDesc"
            placeholder="وصف المنتج"
            inputVal={newProductData?.productDesc}
            onValChange={handleFieldChange}
            isTextarea
          />

          <PopupDropdown
            name="productCategory"
            value={newProductData.categoryId}
            onChange={handleSelectChange}
            label="فئة المنتج"
            options={
              categories?.map((cat) => ({
                id: cat.id,
                name: cat.category,
                created_at: cat.created_at,
              })) || []
            }
          />

          <div className="flex items-center gap-5">
            <PopupDropdown
              name="productColor"
              value={newProductData.variants.color}
              onChange={handleVariantChange("color")}
              label="اللون"
              options={colors || []}
              className="flex-1"
              selectClasses="w-full!"
              isVariant
            />
            <PopupDropdown
              name="productSize"
              value={newProductData.variants.size}
              onChange={handleVariantChange("size")}
              label="المقاس"
              options={sizes || []}
              isVariant
              className="flex-1"
              selectClasses="w-full!"
            />
          </div>
          {/* DROPDOWN SELECTION - TESTING */}
          <DropdownSelection />
          {/* DROPDOWN SELECTION - TESTING */}
          <div className="items-center flex justify-between mt-7">
            <button
              type="submit"
              form="adding_form"
              className={`cursor-pointer bg-accentA text-neutral rounded-lg px-10 py-1 hover:bg-accentA duration-150`}
              disabled={isPending}
            >
              {isPending ? "جاري الاضافة..." : "تأكيد"}
            </button>
            <button
              className="cursor-pointer border border-accentA rounded-lg px-10 py-1 hover:bg-accentA duration-150 hover:text-white"
              onClick={handleClose}
            >
              الغاء
            </button>
          </div>
        </form>
      </div>
    </>
  ) : null;
};

export default memo(AddNewProduct);
