import { axiosInstance } from "@/api/axiosInstance";
import { HandleError, type ErrorServiceResponse } from "./handleError";
import { DeleteAccountUrl } from "@/api/urls";

export type accountDeletionServiceInputType = {
  email: string;
  password: string;
};

type accountDeletionServiceSuccessResponseType = {
  message: string;
  type: "success";
};

export async function accountDeletionService(
  props: accountDeletionServiceInputType,
): Promise<accountDeletionServiceSuccessResponseType | ErrorServiceResponse> {
  try {
    const response = await axiosInstance(DeleteAccountUrl, {
      method: "DELETE",
      data: props,
    });
    return { message: response.data.message, type: "success" };
  } catch (error) {
    return HandleError(error);
  }
}
