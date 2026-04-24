import { deleteBookMarkService } from "@/services/deleteData";
import { toast } from "@repo/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBookmark() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: async (contentId: string) => {
      const response = await deleteBookMarkService(contentId);
      if (response.type === "error") throw new Error(response.message);
      return response.message; // send  message so onSuccess can get it
    },
    onSuccess: (message) => {
      // message from mutationFn (response.message)
      toast.success(message, { position: "top-center" });
      // then refetch the data
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
      return;
    },
    onError: (error: any) => {
      // error from mutationFn (throw new Error(reponse.message))
      return toast.error(error.message, { position: "top-center" });
    },
  });
  return result;
}
