// import { Checkbox } from "@/components/ui/checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

type TOptions = {
  id: string;
  name: string;
  created_at: Date;
  is_available?: boolean;
};

type Props = {
  options: TOptions[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
};

const DropdownSelection = ({ options, selectedIds, onChange }: Props) => {
  const handleChange = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-dark-gray w-fit">اختر المقاس</p>
      <div className="flex item-center justify-between bg-[#eee] py-4 px-5 rounded-lg">
        {/* {isChecked ? (
          <input
            type="number"
            placeholder="أضف الكمية"
            className="border border-[#ccc] text-xs py-2 px-1 rounded-sm"
          />
        ) : null} */}
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <div key={opt.id} className="flex items-center gap-2 self-start">
              <label htmlFor={`checkbox-of-${opt.name}`}>{opt.name}</label>
              <Checkbox
                id={`checkbox-of-${opt.name}`}
                checked={selectedIds.includes(opt.id)}
                onCheckedChange={() => handleChange(opt.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DropdownSelection);
