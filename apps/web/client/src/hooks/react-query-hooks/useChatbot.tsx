import { chatService, type chatServiceInputType } from "@/services/chatService";
import { toast } from "@repo/ui";
import { useMutation } from "@tanstack/react-query"



export function useChatbot() {
    const result = useMutation({
        mutationFn: async (props: chatServiceInputType) => {
            const response = await chatService(props)
            if (response.type === "error") throw new Error(response.message);
            return response;
        }
        ,
        onError: (error) => {
            toast.error(error.message || "Something went wrong", { position: "top-center" })
        }
    });
    return result;
}
