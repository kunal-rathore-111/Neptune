import {
  updatePasswordService,
  type updatePasswordServiceInputType,
} from "@/services/updatePasswordService";
import { toast } from "@repo/ui";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePassword() {
  const result = useMutation({
    mutationFn: async (props: updatePasswordServiceInputType) => {
      const response = await updatePasswordService(props);
      if (response?.type === "error") {
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
