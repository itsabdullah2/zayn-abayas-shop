import { getNotifications } from "@/supabase";
import type { TNotificationTable } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";

const useNotifications = () => {
  const {
    data: notificationsData = [],
    isLoading,
    refetch,
  } = useQuery<TNotificationTable[]>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    // staleTime: 1000 * 60 * 5,
  });

  return { notificationsData, isLoading, refetch };
};

export default useNotifications;
