import { signOutService } from "@/services/sign";
import { toast } from "@repo/ui";
import { useMutation } from "@tanstack/react-query";

export function useSignOut() {
  const result = useMutation({
    mutationFn: async () => {
      const response = await signOutService();
      if (response.type === "error") throw new Error(response.message);
      return response;
    },
    onSuccess: () => {
      window.location.href = "/sign-in";
    },
    onError: (error) => {
      toast.success(error.message, { position: "top-center" });
    },
  });
  return result;
}
