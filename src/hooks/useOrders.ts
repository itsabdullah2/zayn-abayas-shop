import {
  getAllOrdersFromOrdersTableOnly,
  getTopProducts,
} from "@/supabase/db/orders";
import type { TOrdersTable, TTopProducts } from "@/supabase/types";
import { useEffect, useState } from "react";

const useOrders = () => {
  const [topProducts, setTopProducts] = useState<TTopProducts[]>([]);
  const [orders, setOrders] = useState<TOrdersTable[]>([]);

  useEffect(() => {
    const getOrdersData = async () => {
      const response = await getAllOrdersFromOrdersTableOnly();
      setOrders(response);
    };

    getOrdersData();
  }, []);

  useEffect(() => {
    const fetchTopProducts = async () => {
      const res = await getTopProducts();
      setTopProducts(res);
    };

    fetchTopProducts();
  }, []);

  return { orders, topProducts };
};

export default useOrders;
