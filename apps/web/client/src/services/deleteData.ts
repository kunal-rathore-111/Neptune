import { DeleteBookmarkUrl } from "@/api/urls";
import axios from "axios";
import { HandleError, type ServiceResponse } from "./handleError";

type deleteServiceReturnType = ServiceResponse;
export async function deleteBookMarkService(
  contentId: string,
): Promise<deleteServiceReturnType> {
  try {
    const response = await axios(DeleteBookmarkUrl + `/${contentId}`, {
      withCredentials: true,
      method: "DELETE",
    });
    //  console.error(response.data);
    return { message: response.data.message, type: "success" };
  } catch (error) {
    console.error("Error= ", error);
    return HandleError(error);
  }
}
