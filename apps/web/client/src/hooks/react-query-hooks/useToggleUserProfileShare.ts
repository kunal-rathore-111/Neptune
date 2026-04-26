import { ToggleUserShareService } from "@/services/toggleUserShare";
import { toast } from "@repo/ui";
import { useMutation } from "@tanstack/react-query";

export function useToggleUserProfileShare() {
  const result = useMutation({
    mutationFn: async (share: boolean) => {
      const response = await ToggleUserShareService(share);
      if (
        response.type === "error" &&
        response.status !== 401
      ) // unauth handled in axiosInstance
      {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
  return result;
}
