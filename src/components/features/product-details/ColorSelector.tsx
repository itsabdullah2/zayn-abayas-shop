import { useState } from "react";

const sharedSizeStyles =
  "py-1 px-3 rounded-full border w-15 cursor-pointer text-sm";
const activeSizeStyle = "text-neutral bg-primary border-primary";
const inactiveSizeStyle = "text-primary border-gray-400";
const sharedColorStyles =
  "h-4 w-4 border rounded-full cursor-pointer bg-gray-400";
const activeColorStyle = "border-primary p-[3px]";
const inactiveColorStyle = "bg-light-gray border-gray-400 p-[2px]";

const ColorSelector = () => {
  const [size, setSize] = useState("l");
  const [color, setColor] = useState("white");

  return (
    <div className="flex gap-3 mt-5">
      <div className="flex-1 flex flex-col gap-1">
        <h4 className="text-primary font-medium text-[15px]">Select Color</h4>
        <div className="flex items-center gap-1">
          <button
            className={`${sharedColorStyles} ${
              color === "white" ? activeColorStyle : inactiveColorStyle
            }`}
            onClick={() => setColor("white")}
          >
            <span className={`bg-neutral h-full w-full block rounded-full`} />
          </button>
          <button
            className={`${sharedColorStyles} ${
              color === "black" ? activeColorStyle : inactiveColorStyle
            }`}
            onClick={() => setColor("black")}
          >
            <span className={`bg-primary h-full w-full block rounded-full`} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <h4 className="text-primary font-medium text-[15px]">Select Size</h4>
        <div className="flex items-center gap-2">
          <button
            className={`${sharedSizeStyles} ${
              size === "xs" ? activeSizeStyle : inactiveSizeStyle
            }`}
            onClick={() => setSize("xs")}
          >
            XS
          </button>
          <button
            className={`${sharedSizeStyles} ${
              size === "s" ? activeSizeStyle : inactiveSizeStyle
            }`}
            onClick={() => setSize("s")}
          >
            S
          </button>
          <button
            className={`${sharedSizeStyles} ${
              size === "m" ? activeSizeStyle : inactiveSizeStyle
            }`}
            onClick={() => setSize("m")}
          >
            M
          </button>
          <button
            className={`${sharedSizeStyles} ${
              size === "l" ? activeSizeStyle : inactiveSizeStyle
            }`}
            onClick={() => setSize("l")}
          >
            L
          </button>
          <button
            className={`${sharedSizeStyles} ${
              size === "xl" ? activeSizeStyle : inactiveSizeStyle
            }`}
            onClick={() => setSize("xl")}
          >
            XL
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector;
