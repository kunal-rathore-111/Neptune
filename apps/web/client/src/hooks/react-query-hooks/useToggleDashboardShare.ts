import {
  toggleShareService,
  type toggleShareServiceInputType,
} from "@/services/toggleShare";
import { toast } from "@repo/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useToggleDashboardShare() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: async ({ share, contentId }: toggleShareServiceInputType) => {
      const response = await toggleShareService({ share, contentId });
      if (response.type === "error") throw new Error(response.message);
      return response.message;
    },
    onSuccess: (message) => {
      toast.success(message, { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      return;
    },
    onError: (error: any) => {
      return toast.success(error.message, { position: "top-center" });
    },
  });
  return result;
}
