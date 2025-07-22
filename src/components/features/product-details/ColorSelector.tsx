import type { ColorsAndSizesType } from "@/supabase/types";
import { useState } from "react";

const sharedSizeStyles =
  "py-1 px-3 rounded-full border w-15 cursor-pointer text-sm";
const activeSizeStyle = "text-neutral bg-primary border-primary";
const inactiveSizeStyle = "text-primary border-soft-gray";
const sharedColorStyles =
  "h-4 w-4 border rounded-full cursor-pointer bg-soft-gray";
const activeColorStyle = "border-primary p-[3px]";
const inactiveColorStyle = "bg-light-gray border-soft-gray p-[2px]";

type Props = {
  sizes: ColorsAndSizesType[];
  colors: ColorsAndSizesType[];
};

const ColorSelector = ({ sizes, colors }: Props) => {
  const [size, setSize] = useState("l");
  const [color, setColor] = useState("white");

  return (
    <div className="flex gap-3 mt-5">
      <div className="flex-1 flex flex-col gap-1">
        <h4 className="text-primary font-medium text-[15px]">Select Color</h4>
        <div className="flex items-center gap-1">
          {colors.map((c) => (
            <button
              key={c.id}
              className={`${sharedColorStyles} ${
                color === c.name ? activeColorStyle : inactiveColorStyle
              }`}
              onClick={() => setColor(c.name)}
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

      <div className="flex-1 flex flex-col gap-1">
        <h4 className="text-primary font-medium text-[15px]">Select Size</h4>
        <div className="flex items-center gap-2">
          {sizes.map((s) => (
            <button
              key={s.id}
              className={`${sharedSizeStyles} ${
                size === s.name ? activeSizeStyle : inactiveSizeStyle
              }`}
              onClick={() => setSize(s.name)}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
