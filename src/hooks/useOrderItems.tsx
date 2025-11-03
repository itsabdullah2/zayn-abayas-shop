import { getOrderItems } from "@/supabase/db/orders";
import type { OrderItem } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";

const useOrderItems = () => {
  const { data: orderItemsData = [] } = useQuery<OrderItem[]>({
    queryKey: ["order-items"],
    queryFn: getOrderItems,
    staleTime: 3 * 1000 * 60, // 3 minute
  });

  return { orderItemsData };
};
export default useOrderItems;
