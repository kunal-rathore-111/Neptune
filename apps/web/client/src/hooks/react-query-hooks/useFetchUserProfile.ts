import { fetchUserProfileService } from "@/services/fetchUserProfile";
import { useQuery } from "@tanstack/react-query";

export function useFetchUserProfile(options = {}) {
  const result = useQuery({
    queryKey: ["useProfileData"],
    queryFn: async () => {
      const response = await fetchUserProfileService();
      if (response.type === "error") {
        throw new Error(response.message);
      }
      // 401 do nothing (already redirected using the axiosInstance interceptor)
      return response;
    }, retry: 0,
    ...options
  });
  return result;
}
