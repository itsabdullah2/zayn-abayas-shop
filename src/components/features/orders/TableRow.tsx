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
  setDropdownActions: React.Dispatch<React.SetStateAction<string | null>>;
};

const TableRow = ({
  order,
  dropdownActions,
  handleDropdownActions,
  setDropdownActions,
}: Props) => {
  const [orderItem, setOrderItem] = useState<OrderItemWithProduct>();
  const openTrackingPopup = useContextSelector(
    OrdersContext,
    (ctx) => ctx?.openTrackingPopup
  );

  const memoizedOrder = React.useMemo(
    () => order,
    [order.status, order.id, order.order_items]
  );

  const { bg, text } = getStatusColors(memoizedOrder.status);
  const statusLabel = getArabicStatusLabel(memoizedOrder.status);

  const returnedItem = useCallback(
    () => memoizedOrder.order_items.map((item) => setOrderItem(item)),
    [memoizedOrder.order_items]
  );

  useEffect(() => {
    returnedItem();
  }, [returnedItem]);

  return (
    <tr className="py-2 odd:bg-light-gray">
      <td className="text-center py-3 px-2 whitespace-nowrap rounded-tr-lg rounded-br-lg">
        {orderItem?.product.product_name &&
        orderItem?.product.product_name.length > 30
          ? orderItem?.product.product_name.slice(0, 30) + "..."
          : orderItem?.product.product_name}
      </td>
      <td className="text-center py-3 px-2 whitespace-nowrap">
        {memoizedOrder.order_number}
      </td>
      <td className="text-center py-3 px-2 whitespace-nowrap">
        {new Date(memoizedOrder.created_at).toLocaleDateString()}
      </td>
      <td className="text-center py-3 px-2 whitespace-nowrap">
        {orderItem?.quantity}
      </td>
      <td className="text-center py-3 px-2 whitespace-nowrap">
        {PriceFormatter(memoizedOrder.total_price, "eg")} ج.م
      </td>
      <td className="text-center py-3 px-2">
        <span
          className={`px-2 py-1 rounded-full text-sm ${bg} ${text} w-28 block mx-auto whitespace-nowrap`}
        >
          {statusLabel}
        </span>
      </td>
      <td className="text-center py-3 px-2 relative rounded-tl-lg rounded-bl-lg">
        <button
          className="cursor-pointer text-primary"
          onClick={() => handleDropdownActions(memoizedOrder.id)}
        >
          <MdMoreVert size={25} />
        </button>
        {dropdownActions === memoizedOrder.id && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setDropdownActions(null)}
          >
            <div
              className="absolute"
              style={{
                top: `${
                  (event?.target as HTMLElement)?.getBoundingClientRect()
                    .bottom + window.scrollY
                }px`,
                left: `${
                  (event?.target as HTMLElement)?.getBoundingClientRect().left +
                  window.scrollX
                }px`,
              }}
            >
              <DropdownActions
                openOrderTrackingPopup={() =>
                  openTrackingPopup?.(memoizedOrder.id)
                }
                setDropdownActions={setDropdownActions}
                status={memoizedOrder.status}
              />
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default React.memo(TableRow);
