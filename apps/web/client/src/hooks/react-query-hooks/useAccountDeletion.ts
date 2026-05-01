import {
  accountDeletionService,
  type accountDeletionServiceInputType,
} from "@/services/accountDeletionService";
import { toast } from "@repo/ui";
import { useMutation } from "@tanstack/react-query";

export function useAccountDeletion() {
  const result = useMutation({
    mutationFn: async (props: accountDeletionServiceInputType) => {
      const response = await accountDeletionService(props);
      if (response.type === "error") throw new Error(response.message);
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message, { position: "top-center" });
      window.location.href = "/";
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
  return result;
}
