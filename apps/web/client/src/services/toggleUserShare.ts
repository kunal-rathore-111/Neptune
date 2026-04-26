import { axiosInstance } from "@/api/axiosInstance";
import { ToggleUserProfileShareUrl } from "@/api/urls";
import { HandleError, type ErrorServiceResponse } from "./handleError";

export type ToggleUserShareServiceResponseType = {
  message: string;
  share_hash: string | null;
  type: "success";
};

export async function ToggleUserShareService(
  share: boolean,
): Promise<ErrorServiceResponse | ToggleUserShareServiceResponseType> {
  try {
    const response = await axiosInstance(ToggleUserProfileShareUrl, {
      method: "PATCH",
      data: { share },
    });
    return {
      message: response.data.message,
      share_hash: response.data.hash,
      type: "success",
    };
  } catch (error) {
    return HandleError(error);
  }
}
