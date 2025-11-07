import { AppContext } from "@/context/AppContext";
import { FaTimes } from "react-icons/fa";
import { useContextSelector } from "use-context-selector";

const EditPopupForm = () => {
  const productId = useContextSelector(
    AppContext,
    (ctx) => ctx?.isEditPopupForm
  )!;
  const onCancel = useContextSelector(AppContext, (ctx) => ctx?.handleCancel);
  return productId ? (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-100" />
      <div className="w-[95vw] sm:w-[500px] bg-white rounded-xl py-4 px-5 fixed top-1/2 left-1/2 z-200 -translate-x-1/2 -translate-y-1/2">
        Edit Popup Form
        <div className="items-center flex justify-between">
          <button className="cursor-pointer bg-accentA text-neutral rounded-lg px-10 py-1 hover:bg-accentA duration-150">
            تأكيد
          </button>
          <button
            className="cursor-pointer border border-accentA rounded-lg px-10 py-1 hover:bg-accentA duration-150 hover:text-white"
            onClick={onCancel}
          >
            الغاء
          </button>
        </div>
        {/* Close button */}
        <button
          className="absolute top-2 right-2 p-1 border border-gray-300 cursor-pointer rounded-md text-gray-400 hover:text-primary hover:border-primary duration-200"
          onClick={onCancel}
        >
          <FaTimes />
        </button>
      </div>
    </>
  ) : null;
};

export default EditPopupForm;
