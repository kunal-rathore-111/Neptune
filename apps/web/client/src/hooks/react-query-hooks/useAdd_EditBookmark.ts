import {
  add_edit_BookMarkService,
  type Add_Edit_BookmarkType,
} from "@/services/add_edit_Data";
import { toast } from "@repo/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAdd_EditBookmark() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: async (props: Add_Edit_BookmarkType) => {
      console.error(props.data.category);
      const response = await add_edit_BookMarkService(props);
      if (response.type === "error") {
        throw new Error(response.message);
      }
      return response;
    },
    onError: (error: any) => {
      // need to create center toast with diff position so just pass message
      toast.error(error.message, { position: "top-center" });
    },
    onSuccess: (response) => {
      toast.success(response.message, { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
    },
  });
  return result;
}
