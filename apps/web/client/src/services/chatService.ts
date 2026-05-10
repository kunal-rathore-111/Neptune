import { axiosInstance } from "@/api/axiosInstance";
import { HandleError, type ErrorServiceResponse } from "./handleError";
import { ChatUrl } from "@/api/urls";


export type chatServiceInputType = {
    userQuery: string
    chatHistory: {
        role: "user" | "bot";
        content: string;
    }[]
}
type chatServiceResponseType = {
    type: "success",
    response: string
} | ErrorServiceResponse

export async function chatService(props: chatServiceInputType): Promise<chatServiceResponseType> {
    try {
        const response = await axiosInstance(ChatUrl, {
            data: props,
            method: "POST"
        })
        return { type: "success", response: response.data.message }
    } catch (error) {
        return HandleError(error);
    }
}
