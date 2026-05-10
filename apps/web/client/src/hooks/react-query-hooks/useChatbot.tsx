import { chatService } from "@/services/chatService";
import { toast } from "@repo/ui";
import { useMutation } from "@tanstack/react-query"



export function useChatbot() {
    const result = useMutation({
        mutationFn: async (userQuery: string) => {
            const response = await chatService(userQuery)
            if (response.type === "error") throw new Error();
            return response;
        }
        , onSuccess: () => {
            //needs to put data in a global array

        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong", { position: "top-center" })
        }
    });
    return result;
}