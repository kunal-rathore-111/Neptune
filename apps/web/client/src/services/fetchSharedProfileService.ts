import axios from "axios";
import { HandleError, type ErrorServiceResponse } from "./handleError";
import { UserSharedProfileFetchUrl } from "@/api/urls";


type sharedProfileDataType = {
    id: string;
    title: string;
    description: string | null;
    link: string | null;
    category: "Development" | "Finance" | "Study" | "Social" | "GitHub" | "Exams" | "AI" | "Research" | "Design" | "Others";
    tags: string[] | null;
    userId: string;
    createdDate: Date;
    updatedDate: Date;
}
type successFetchSharedProfileServiceResponseType = {
    type: "success"
    message: string,
    data: sharedProfileDataType[],
    pagination: {
        hasMoreContent: boolean,
        nextCursor: Date | undefined
    }
}
type fetchSharedProfileServiceResponseType = successFetchSharedProfileServiceResponseType | ErrorServiceResponse;

export async function
    fetchSharedProfileService(pageParam: Date | undefined, share_hash: string):
    Promise<fetchSharedProfileServiceResponseType> {

    try {
        const response = await axios(UserSharedProfileFetchUrl + `/${share_hash}/?cursor=${pageParam}`,
            {
                method: "GET",
            }
        )
        console.error(response);
        return {
            type: "success",
            message: response.data.message,
            data: response.data.data,
            pagination: {
                hasMoreContent: response.data.pagination.hasMoreContent,
                nextCursor: response.data.pagination.nextCursor
            }
        }
    } catch (error) {
        return HandleError(error);
    }
}