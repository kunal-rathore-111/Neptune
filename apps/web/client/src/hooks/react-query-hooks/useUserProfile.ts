import { fetchUserProfileService } from "@/services/fetchUserProfile";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
  const result = useQuery({
    queryKey: ["useProfileData"],
    queryFn: async () => {
      const response = await fetchUserProfileService();
      if (response.type === "error" && response.status !== 401) {
        console.log(response.message);
        throw new Error(response.message);
      }
      // 401 do nothing (already redirected using the axiosInstance interceptor)
      return response;
    },
  });
  return result;
}
