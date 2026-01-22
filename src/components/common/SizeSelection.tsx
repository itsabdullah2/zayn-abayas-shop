import React from "react";
import type { ColorsAndSizesType } from "@/supabase/types";

type Props = {
  sizes: ColorsAndSizesType[];
  selectedSizeId: string;
  onSizeChange: (sizeId: string) => void;
  isAvailable: boolean | undefined;
};

const sharedSizeStyles =
  "py-1 px-3 rounded-full border w-15 cursor-pointer text-sm";
const activeSizeStyle = "text-neutral bg-primary border-primary";
const inactiveSizeStyle = "text-primary border-soft-gray";

const SizeSelection = ({
  sizes,
  selectedSizeId,
  onSizeChange,
  isAvailable,
}: Props) => {
  return (
    <div className="flex-1 flex flex-col gap-1">
      <h4 className="text-primary font-medium text-[15px]">اختر المقاس</h4>
      <div className="flex items-center gap-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            className={`${sharedSizeStyles} ${
              selectedSizeId === size.id ? activeSizeStyle : inactiveSizeStyle
            }`}
            onClick={() => onSizeChange(size.id)}
            disabled={!isAvailable}
            aria-label={`Select size ${size.name}`}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(SizeSelection);
