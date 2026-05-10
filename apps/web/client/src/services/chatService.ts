import { axiosInstance } from "@/api/axiosInstance";
import { HandleError, type ErrorServiceResponse } from "./handleError";
import { ChatUrl } from "@/api/urls";


type chatServiceResponseType = {
    type: "success",
    response: string
} | ErrorServiceResponse

export async function chatService(userQuery: string): Promise<chatServiceResponseType> {
    try {
        const response = await axiosInstance(ChatUrl, {
            data: { userQuery },
            method: "POST"
        })
        return { type: "success", response: response.data.message }
    } catch (error) {
        return HandleError(error);
    }
}