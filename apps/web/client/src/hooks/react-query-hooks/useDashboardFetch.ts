import { fetchDataService } from "@/services/fetchData";
import { useInfiniteQuery } from "@tanstack/react-query";

// hook to fetch dashboard data for user when login/signup
export function useDashboardFetch() {
  const result = useInfiniteQuery({
    queryKey: ["dashboardData"],
    queryFn: fetchDataService,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.type === "error") return undefined;
      else return lastPage.pagination.hasMoreContent ? lastPage.pagination.nextCursor : undefined
    }
  })
  return result;
}
