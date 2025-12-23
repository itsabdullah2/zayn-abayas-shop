// import { Checkbox } from "@/components/ui/checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

type TOptions = {
  id: string;
  name: string;
  created_at: Date;
  is_available?: boolean;
};

type Props = {
  label: string;
  options: TOptions[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  onOpenChange?: (open: boolean) => void;
};

const DropdownSelection = ({
  options,
  selectedIds,
  onChange,
  onOpenChange,
  label,
}: Props) => {
  const handleChange = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <p className="text-sm font-medium text-dark-gray w-fit">{label}</p>
      <div className="flex item-center justify-between border border-[#eee] py-2 rounded-lg">
        <div className="flex flex-col gap-3 w-full">
          <DropdownMenu onOpenChange={onOpenChange} modal={false}>
            <DropdownMenuTrigger>{label}</DropdownMenuTrigger>
            <DropdownMenuContent className="z-10000">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  className="flex items-center justify-between hover:bg-light-gray px-5 min-h-12.5"
                >
                  <div
                    className={`flex items-start justify-end flex-row-reverse gap-5 w-full cursor-pointer`}
                  >
                    <label
                      htmlFor={`checkbox-of-${opt.name}`}
                      className="cursor-pointer text-sm"
                    >
                      {opt.name.toUpperCase()}
                    </label>
                    <Checkbox
                      id={`checkbox-of-${opt.name}`}
                      className="cursor-pointer"
                      checked={selectedIds.includes(opt.id)}
                      onCheckedChange={() => handleChange(opt.id)}
                    />
                  </div>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DropdownSelection);
