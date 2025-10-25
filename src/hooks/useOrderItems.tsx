import { getOrderItems } from "@/supabase/db/orders";
import type { TOrderItemsTable } from "@/supabase/types";
import { useEffect, useState } from "react";

const useOrderItems = () => {
  const [orderItemsData, setOrderItemsData] = useState<TOrderItemsTable[]>([]);

  useEffect(() => {
    const fetchOrderItemsData = async () => {
      const response = await getOrderItems();
      setOrderItemsData(response);
    };

    fetchOrderItemsData();
  }, []);

  return { orderItemsData };
};
export default useOrderItems;
