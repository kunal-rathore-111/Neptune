import { signInUpService, type signInUpFunctionType } from "@/services/sign";
import { toast } from "@repo/ui";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useSign() {
  const navigate = useNavigate();
  const result = useMutation({
    mutationFn: async (props: signInUpFunctionType) => {
      const response = await signInUpService(props);
      if (response.type === "error") throw new Error(response.message);
      return response;
    },
    onSuccess: (response) => {
      toast.success(response.message, { position: "top-center" });

      //here set userData

      navigate("/user/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message, { position: "top-center" });
    },
  });
  return result;
}
