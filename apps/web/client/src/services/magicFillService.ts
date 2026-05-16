import { axiosInstance } from "@/api/axiosInstance";
import { MagicFillUrl } from "@/api/urls";
import { HandleError, type ErrorServiceResponse } from "./handleError";

type magicFillServiceResponseType =
  | ErrorServiceResponse
  | {
      message: string;
      type: "success";
      data: {
        title: string;
        description: string;
        category:
          | "Development"
          | "Finance"
          | "Study"
          | "Social"
          | "GitHub"
          | "Exams"
          | "AI"
          | "Research"
          | "Design"
          | "Others";
        tags: string[];
      };
    };

export async function magicFillService(
  url: string,
): Promise<magicFillServiceResponseType> {
  try {
    const response = await axiosInstance(MagicFillUrl, {
      data: { url },
      method: "POST",
    });
    return {
      message: response.data.message,
      type: "success",
      data: response.data.data,
    };
  } catch (error) {
    return HandleError(error);
  }
}
