import React, { useCallback, useEffect, useState } from "react";
import type { FullOrder, OrderItemWithProduct } from "@/supabase/types";
import { getArabicStatusLabel, getStatusColors } from "@/utils/getStatusColor";
import { PriceFormatter } from "@/utils/formatePrice";
import { MdMoreVert } from "react-icons/md";
import DropdownActions from "./DropdownActions";
import { useContextSelector } from "use-context-selector";
import { OrdersContext } from "@/context/OrdersContext";

type Props = {
  order: FullOrder;
  dropdownActions: string | null;
  handleDropdownActions: (id: string) => void;
  generateOrderNumber: string;
};

const TableRow = ({
  order,
  dropdownActions,
  handleDropdownActions,
  generateOrderNumber,
}: Props) => {
  const [orderItem, setOrderItem] = useState<OrderItemWithProduct>();
  const openTrackingPopup = useContextSelector(
    OrdersContext,
    (ctx) => ctx?.openTrackingPopup
  );

  const { bg, text } = getStatusColors(order.status);
  const statusLabel = getArabicStatusLabel(order.status);

  const returnedItem = useCallback(
    () => order.order_items.map((item) => setOrderItem(item)),
    [order.order_items]
  );

  useEffect(() => {
    returnedItem();
  }, [returnedItem]);

  return (
    <tr className="flex flex-1 py-2 odd:bg-light-gray items-center">
      <td className="flex-1 text-center">{orderItem?.product.product_name}</td>
      <td className="flex-1 text-center">{generateOrderNumber}</td>
      <td className="flex-1 text-center">
        {new Date(order.created_at).toLocaleDateString()}
      </td>
      <td className="flex-1 text-center">{orderItem?.quantity}</td>
      <td className="flex-1 text-center">
        {PriceFormatter(order.total_price, "eg")} ج.م
      </td>
      <td className="flex-1 flex-center text-center">
        <span
          className={`px-2 py-1 rounded-full text-sm ${bg} ${text} w-28 block`}
        >
          {statusLabel}
        </span>
      </td>
      <td className="flex-1 text-center flex-center relative">
        <button
          className="cursor-pointer text-primary"
          onClick={() => handleDropdownActions(order.id)}
        >
          <MdMoreVert size={25} />
        </button>
        {dropdownActions === order.id && (
          <DropdownActions
            openOrderTrackingPopup={() => openTrackingPopup?.(order.id)}
          />
        )}
      </td>
    </tr>
  );
};

export default React.memo(TableRow);
