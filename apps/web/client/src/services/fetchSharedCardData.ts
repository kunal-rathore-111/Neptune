import axios from "axios";
import { HandleError } from "./handleError";
import { SharedContentUrl } from "@/api/urls";
import type { SharedContentDataType } from "@/Types/sharedContent";

type fetchSharedCardDataServiceReturnType =
  | { type: "error"; message: string }
  | { data: SharedContentDataType; type: "success"; message: string };
export async function fetchSharedCardDataService(
  content_share_hash: string,
): Promise<fetchSharedCardDataServiceReturnType> {
  try {
    const response = await axios(SharedContentUrl + `/${content_share_hash}`, {
      method: "GET",
    });
    return {
      message: response.data.message,
      type: "success",
      data: response.data.result,
    };
  } catch (error) {
    return HandleError(error);
  }
}
