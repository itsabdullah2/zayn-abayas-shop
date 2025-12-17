// import type { CategoriesTableType } from "@/supabase/types";
import {
  translateCategoriesOpts,
  translateVariantsOpts,
} from "@/utils/translateOptsInAddProductPopup";
import React from "react";

type TOptions = {
  id: string;
  name: string;
  created_at: Date;
  is_available?: boolean;
};

type Props = {
  value: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: TOptions[];
  className?: string;
  selectClasses?: string;
  isVariant?: boolean;
};
const PopupDropdown = ({
  value,
  label,
  name,
  onChange,
  options,
  className,
  selectClasses,
  isVariant = false,
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
        {options?.map((opt) => (
          <option
            key={opt.id}
            value={opt.id}
            disabled={opt.is_available === false}
          >
            {isVariant
              ? translateVariantsOpts(opt.name).toUpperCase()
              : translateCategoriesOpts(opt.name)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(PopupDropdown);
