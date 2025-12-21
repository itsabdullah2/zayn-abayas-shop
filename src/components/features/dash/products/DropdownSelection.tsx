// import { Checkbox } from "@/components/ui/checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

const DropdownSelection = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <div className="flex flex-col gap-2">
      <p className="">اختر المقاس</p>
      <div className="flex item-center justify-between bg-[#eee] py-4 px-5 rounded-lg">
        {isChecked ? (
          <input
            type="number"
            placeholder="أضف الكمية"
            className="border border-[#ccc] text-xs py-2 px-1 rounded-sm"
          />
        ) : null}
        <div className="flex items-center gap-2 self-start">
          <label htmlFor="checkbox">XL</label>
          <Checkbox
            id="checkbox"
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DropdownSelection);
