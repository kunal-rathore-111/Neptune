import { DeleteBookmarkUrl } from "@/api/backend";
import axios from "axios";
import { HandleError, type ServiceResponse } from "./handleError";

type deleteServiceType = ServiceResponse;
export async function deleteBookMarkService(
  contentId: string,
): Promise<deleteServiceType> {
  try {
    const response = await axios(DeleteBookmarkUrl + `/${contentId}`, {
      withCredentials: true,
      method: "DELETE",
    });
    console.error(response.data);
    return { message: response.data.message, type: "success" };
  } catch (error) {
    console.error("Error= ", error);
    return HandleError(error);
  }
}
