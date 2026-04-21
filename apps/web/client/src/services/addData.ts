import { AddBookmarkUrl } from "@/api/backend";
import { HandleError, type ServiceResponse } from "./handleError";
import axios from "axios";

/* need to replace with zod type validation */
type addBookmarkDataType = {
  description: string;
  link: string;
  title: string;
  tags: string[];
  isShareable: boolean;
  category: string;
};

type AddBookmarkResponseType = ServiceResponse;

export async function addBookMarkService(
  data: addBookmarkDataType,
): Promise<AddBookmarkResponseType> {
  try {
    const response = await axios(AddBookmarkUrl, {
      method: "POST",
      data: data,
      withCredentials: true,
    });

    return { message: response.data.message, type: "success" };
  } catch (error) {
    //console.error("Error= ", error);
    return HandleError(error);
  }
}
