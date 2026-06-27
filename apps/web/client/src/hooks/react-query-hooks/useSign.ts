import { signInUpService, type signInUpFunctionType } from "@/services/sign";
import { toast } from "@repo/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useSign() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: async (props: signInUpFunctionType) => {
      const response = await signInUpService(props);
      if (response.type === "error") throw new Error(response.message);
      return response;
    },

    onSuccess: (response) => {
      toast.success(response.message, { position: "top-center" });

      //here again fetch user user profile data silently
      queryClient.invalidateQueries({ queryKey: ["userProfileData"] });

      navigate("/user/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
  return result;
}
