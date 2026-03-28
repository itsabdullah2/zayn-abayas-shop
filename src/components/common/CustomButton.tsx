import React from "react";

type Props = {
  type?: "button" | "submit";
  className?: string;
  btnText: string;
  btnType?: "primary" | "secondary";
  onClick?: () => void;
  isDisabled?: boolean;
};

const CustomButton = ({
  type = "button",
  className,
  btnText,
  btnType,
  onClick,
  isDisabled,
}: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${btnType === "primary" ? "primary-btn" : btnType === "secondary" ? "secondary-btn" : ""} overflow-hidden relative group ${className}`}
    >
      {btnText}
      <span className="shine-effect group-hover:animate-shine" />
    </button>
  );
};

export default React.memo(CustomButton);
