import { fetchDataService } from "@/services/fetchDataService";
import { useInfiniteQuery } from "@tanstack/react-query";

// hook to fetch dashboard data for user when login/signup
export function useDashboardFetch(options = {}) {
  const result = useInfiniteQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDataService,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage?.type === "error") return undefined;
      else return lastPage.pagination.hasMoreContent ? lastPage.pagination.nextCursor : undefined
    },
    ...options
  })
  return result;
}
