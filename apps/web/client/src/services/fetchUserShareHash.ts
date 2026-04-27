import { axiosInstance } from "@/api/axiosInstance";
import { FetchUserProfileShareHashUrl } from "@/api/urls";
import { HandleError, type ErrorServiceResponse } from "./handleError";
type fetchUserShareHashResponseType = {
  hash: string | null;
  type: "success";
};

export async function fetchUserShareHash(): Promise<
  ErrorServiceResponse | fetchUserShareHashResponseType
> {
  try {
    const response = await axiosInstance(FetchUserProfileShareHashUrl, {
      method: "GET",
    });
    return { hash: response.data.hash, type: "success" };
  } catch (error) {
    return HandleError(error);
  }
}
