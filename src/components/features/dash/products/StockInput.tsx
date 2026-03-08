// import { useUpdateVariant } from "@/hooks/useVariants";
import type { TVariantsVM } from "@/types";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

type Props = {
  variant: TVariantsVM;
};

const StockInput = ({ variant }: Props) => {
  const [stock, setStock] = useState(variant.stock);

  // const updateStockMutation = useUpdateVariant();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value) || 0);
    setStock(value);
  };

  // const handleUpdateVariantStock = async (variantId: string, stock: number) => {
  //   await updateStockMutation.mutateAsync({
  //     id: variantId,
  //     stock,
  //   });
  // };

  const handleIncrease = () => setStock((prev) => prev + 1);
  const handleDecrease = () => setStock((prev) => Math.max(0, prev - 1));

  const handleBlur = async () => {
    // handleUpdateVariantStock(variant.id, stock);
    // await updateStockMutation.mutateAsync({
    //   id: variant.id,
    //   stock,
    // });
  };

  return (
    <>
      <button
        onClick={handleDecrease}
        className="py-0.5 px-2 border border-secondary text-primary rounded cursor-pointer"
      >
        <FaMinus size={13} />
      </button>
      <input
        type="number"
        min={0}
        step={1}
        className="w-10 text-center"
        name="stock-field"
        id={variant.id}
        value={stock}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button
        onClick={handleIncrease}
        className="py-0.5 px-2 border border-secondary text-primary rounded cursor-pointer"
      >
        <FaPlus size={13} />
      </button>
    </>
  );
};

export default StockInput;
