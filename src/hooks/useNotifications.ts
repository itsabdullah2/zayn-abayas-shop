import { getNotifications, updateNotification } from "@/supabase";
import type { TNotificationTable } from "@/supabase/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotifications = () => {
  const {
    data: notificationsData = [],
    isLoading,
    refetch,
  } = useQuery<TNotificationTable[]>({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: 1000 * 60 * 2,
  });

  return { notificationsData, isLoading, refetch };
};

export const useUpdateNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ is_read }: { is_read: boolean }) =>
      updateNotification(is_read),
    onSuccess: () => {
      // queryClient.invalidateQueries({queryKey: ['notification']})
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
