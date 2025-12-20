import { supabase } from "@/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useOrdersRealtime = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Create a channel for orders table
    const channel = supabase
      .channel("orders-channel") // name of the change
      .on(
        "postgres_changes",
        {
          event: "*", // Listen for all events (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "orders",
        },
        (payload) => {
          // console.log("Realtime change received:", payload);
          // Refetch all order-related queries
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
};
