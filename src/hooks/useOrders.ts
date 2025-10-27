import { getAllOrdersFromOrdersTableOnly } from "@/supabase/db/orders";
import type { TOrdersTable } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";

const useOrders = () => {
  return useQuery<TOrdersTable[]>({
    queryKey: ["orders"],
    queryFn: getAllOrdersFromOrdersTableOnly,
    staleTime: 1000 * 60 * 5,
  });
};

export default useOrders;
