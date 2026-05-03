import { magicFillService } from "@/services/magicFillService";
import { toast } from "@repo/ui";
import { useMutation } from "@tanstack/react-query";

export function useMagicFill() {
  const result = useMutation({
    mutationFn: async (url: string) => {
      const response = await magicFillService(url);
      if (
        response.type !== "success" &&
        response.status !== 401
      ) // 401 handled in axiosInstance.ts
      {
        throw new Error(response.message);
      }
      console.error(response);
      return response;
    },
    onError: (error: any) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
  return result;
}
