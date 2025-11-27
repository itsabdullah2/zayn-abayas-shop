import { memo } from "react";
import PopupField from "./PopupField";
import uploadImage from "@/assets/upload.png";
import { useContextSelector } from "use-context-selector";
import { ProductContext } from "@/context/ProductContext";

type Props = {
  isNewProduct: boolean;
  setProductChange: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: React.FormEvent) => void;
};

const AddNewProduct = ({ isNewProduct, setProductChange, onSubmit }: Props) => {
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

  return isNewProduct ? (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-100" />
      <div className="w-[95vw] sm:w-[500px] bg-white rounded-xl py-4 px-5 fixed top-1/2 left-1/2 z-200 -translate-x-1/2 -translate-y-1/2">
        <h2 className="font-medium text-primary text-lg">
          قم بإضافة منتج جديد
        </h2>
        {/* Popup Fields */}
        <form
          id="adding_form"
          className="flex flex-col gap-2 mt-4"
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
            label="وصف المنتج"
            type="text"
            name="productDesc"
            placeholder="وصف المنتج"
            inputVal={newProductData?.productDesc}
            onValChange={handleFieldChange}
            isTextarea
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="productCategory"
              className="text-sm font-medium text-dark-gray w-fit"
            >
              فئة المنتج
            </label>
            <select
              name="productCategory"
              id="productCategory"
              className="w-1/2 border border-primary rounded-md focus:outline-none"
              value={newProductData.categoryName}
              onChange={(e) =>
                setNewProductData((prev) => ({
                  ...prev,
                  categoryName: e.target.value,
                }))
              }
            >
              <option value="" disabled>
                قم باختيار فئة المنتج
              </option>
              <option value="luxury">فاخرة</option>
              <option value="modern">عصرية</option>
              <option value="classic">كلاسيكية</option>
            </select>
          </div>
        </form>

        <div className="items-center flex justify-between mt-7">
          <button
            type="submit"
            form="adding_form"
            className={`cursor-pointer bg-accentA text-neutral rounded-lg px-10 py-1 hover:bg-accentA duration-150`}
            // disabled={updateProductMutation.isPending}
          >
            {/* {updateProductMutation.isPending ? "جاري التحديث..." : "تأكيد"} */}
            تأكيد
          </button>
          <button
            className="cursor-pointer border border-accentA rounded-lg px-10 py-1 hover:bg-accentA duration-150 hover:text-white"
            onClick={() => setProductChange(false)}
          >
            الغاء
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default memo(AddNewProduct);
