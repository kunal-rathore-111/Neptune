import { fetchDataService } from "@/services/fetchData";
import { useQuery } from "@tanstack/react-query";

// hook to fetch dashboard data for user when login/signup
export function useDashboardFetch() {
  const result = useQuery({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      // fetchSerivce call-> will return type- success or error
      const response = await fetchDataService();
      if (response.type === "error") {
        /*if error it will retry for atleast 3 times */
        throw new Error(response.message);
      } else return response;
    },
  });
  return result;
}
