import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000 * 5, // Data stays fresh for 5 mins
      gcTime: 60 * 1000 * 10, // Cache kept for 10 mins
      retry: 2, // Retry failed requests twice
      refetchOnWindowFocus: true, // Update the data on focus
      refetchOnReconnect: true, // Update the data on reconnect
    },
  },
});
