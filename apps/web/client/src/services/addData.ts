import { AddBookmarkUrl } from "@/api/backend";
import { HandleError } from "./handleError";
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

export async function addBookMarkService(data: addBookmarkDataType) {
  try {
    console.log(data);
    const response = await axios(AddBookmarkUrl, {
      method: "POST",
      data: data,
      withCredentials: true,
    });
    console.error(response.data);
  } catch (error) {
    console.error("Error= ", error);
    return HandleError(error);
  }
}
