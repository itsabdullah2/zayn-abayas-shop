import {
  getAllOrdersFromOrdersTableOnly,
  getTopProducts,
} from "@/supabase/db/orders";
import type { TOrdersTable, TTopProducts } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useOrders = () => {
  const { data: orders, isLoading } = useQuery<TOrdersTable[]>({
    queryKey: ["orders"],
    queryFn: getAllOrdersFromOrdersTableOnly,
    staleTime: 1000 * 60 * 5,
  });
  const [topProducts, setTopProducts] = useState<TTopProducts[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const res = await getTopProducts();
      setTopProducts(res);
    };

    fetchTopProducts();
  }, []);

  return { orders, isLoading, topProducts };
};

export default useOrders;
