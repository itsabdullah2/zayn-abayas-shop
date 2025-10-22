import { getArabicStatusLabel } from "@/utils/getStatusColor";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  status: string;
  orderId: string;
  handleStatusChange: (newStatus: string, orderId: string) => void;
};

const Dropdown = ({ status, orderId, handleStatusChange }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={status === "cancelled"}>
        <Button className="cursor-pointer bg-primary text-neutral">
          {getArabicStatusLabel(status)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-primary text-neutral">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => handleStatusChange("processing", orderId)}
          >
            قيد المعالجة
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusChange("shipped", orderId)}
          >
            تم الشحن
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusChange("out_for_delivery", orderId)}
          >
            جاري التوصيل
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusChange("returned", orderId)}
          >
            تم الاسترجاع
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusChange("delivered", orderId)}
          >
            تم التوصيل
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
