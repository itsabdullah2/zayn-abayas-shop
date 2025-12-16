import React from "react";

type Props = {
  value: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { optLabel: string; optValue: string }[];
  className?: string;
  selectClasses?: string;
};
const PopupDropdown = ({
  value,
  label,
  name,
  onChange,
  options,
  className,
  selectClasses,
}: Props) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-dark-gray w-fit"
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        className={`w-1/2 border border-primary rounded-md focus:outline-none ${selectClasses}`}
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          قم باختيار {label}
        </option>
        {options.map((opt) => (
          <option key={opt.optValue} value={opt.optValue}>
            {opt.optLabel}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(PopupDropdown);
