import { ProductContext } from "@/context/ProductContext";
import type { TVariantsVM } from "@/types";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useContextSelector } from "use-context-selector";

const StockInput = ({ variant }: { variant: TVariantsVM }) => {
  const stockChanges = useContextSelector(
    ProductContext,
    (ctx) => ctx?.stockChanges,
  )!;
  const updateStock = useContextSelector(
    ProductContext,
    (ctx) => ctx?.updateStock,
  )!;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStock(variant.id, Number(e.target.value), variant.stock);
  };

  const handleIncrease = () => {
    const current = stockChanges[variant.id] ?? variant.stock;
    updateStock(variant.id, current + 1, variant.stock);
  };
  const handleDecrease = () => {
    const current = stockChanges[variant.id] ?? variant.stock;
    if (current <= 0) return;
    updateStock(variant.id, current - 1, variant.stock);
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
        name={variant.id}
        id={variant.id}
        value={stockChanges[variant.id] ?? variant.stock}
        onChange={handleChange}
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
