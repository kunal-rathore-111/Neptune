import axios from "axios";
import { HandleError, type ServiceResponse } from "./handleError";
import { ToggleContentShareUrl } from "@/api/urls";

type toggleShareServiceInputType = {
  share: boolean;
  contentId: string;
};

type toggleShareSerivceReturnType = ServiceResponse;

export async function toggleShareService(
  data: toggleShareServiceInputType,
): Promise<toggleShareSerivceReturnType> {
  try {
    const response = await axios(ToggleContentShareUrl + `/${data.contentId}`, {
      method: "PATCH",
      data: data,
      withCredentials: true,
    });
    console.error(response);
    return { message: response.data.message, type: "success" };
  } catch (error) {
    return HandleError(error);
  }
}
