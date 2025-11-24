import { memo } from "react";
import { IoIosClose } from "react-icons/io";

type Props = {
  isNewProduct: boolean;
  setProductChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddNewProduct = ({ isNewProduct, setProductChange }: Props) => {
  return isNewProduct ? (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-100" />
      <div className="w-[95vw] sm:w-[500px] bg-white rounded-xl py-4 px-5 fixed top-1/2 left-1/2 z-200 -translate-x-1/2 -translate-y-1/2 text-center">
        This Functionality is Coming Soon!
        <button
          className="absolute -top-7 right-0 text-light-gray border-light-gray border rounded-full w-5 h-5 flex items-center justify-center text-2xl cursor-pointer"
          onClick={() => setProductChange(false)}
        >
          <IoIosClose size={20} className="" />
        </button>
      </div>
    </>
  ) : null;
};

export default memo(AddNewProduct);
