import type { ColorsAndSizesType } from "@/supabase/types";
import React from "react";

type Props = {
  colors: ColorsAndSizesType[];
  selectedColorId: string;
  onColorChange: (colorId: string) => void;
};

const sharedColorStyles =
  "h-4 w-4 border rounded-full cursor-pointer bg-soft-gray";
const activeColorStyle = "border-primary p-[3px]";
const inactiveColorStyle = "bg-light-gray border-soft-gray p-[2px]";

const ColorSelection = ({ colors, selectedColorId, onColorChange }: Props) => {
  return (
    <div className="flex-1 flex flex-col gap-1">
      <h4 className="text-primary font-medium text-[15px]">اختر اللون</h4>
      <div className="flex items-center gap-1">
        {colors.map((c) => (
          <button
            key={c.id}
            className={`${sharedColorStyles} ${
              selectedColorId === c.id ? activeColorStyle : inactiveColorStyle
            }`}
            onClick={() => onColorChange(c.id)}
          >
            <span
              className={`${
                c.name === "white" ? "bg-neutral" : "bg-primary"
              } h-full w-full block rounded-full`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ColorSelection);
