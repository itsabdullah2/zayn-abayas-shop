import type { TVariantsVM } from "@/types";
import { useState } from "react";

type Props = {
  variant: TVariantsVM;
  onSave: (variantId: string, stock: number) => void;
};

const StockInput = ({ variant, onSave }: Props) => {
  const [stock, setStock] = useState(variant.stock);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Number(e.target.value) || 0);
    setStock(value);
  };

  const handleBlur = () => {
    onSave(variant.id, stock);
  };

  return (
    <>
      <button>-</button>
      <input
        type="number"
        min={0}
        step={1}
        className="w-10 text-center"
        value={stock}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <button>+</button>
    </>
  );
};

export default StockInput;
