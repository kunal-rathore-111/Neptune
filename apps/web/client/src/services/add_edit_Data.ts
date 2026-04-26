import { AddBookmarkUrl, UpdateBookmarkUrl } from "@/api/urls";
import { HandleError, type ServiceResponse } from "./handleError";
import axios from "axios";

type Add_Edit_BookmarkResponseReturnType = ServiceResponse;

/* need to replace with zod type validation */
export type addBookmarkDataType = {
  description: string;
  link: string;
  title: string;
  tags: string[];
  share: boolean;
  category: string;
};
export type editBookmarkDataType = {
  description: string;
  link: string;
  title: string;
  tags: string[];
  share: boolean;
  category: string;
  id: string;
};

async function addBookMark(
  data: addBookmarkDataType,
): Promise<Add_Edit_BookmarkResponseReturnType> {
  try {
    // console.error(data);
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

async function editBookMark(
  data: editBookmarkDataType,
): Promise<Add_Edit_BookmarkResponseReturnType> {
  try {
    // console.error(data);
    const response = await axios(UpdateBookmarkUrl + `/${data.id}`, {
      method: "PATCH",
      data: data,
      withCredentials: true,
    });

    return { message: response.data.message, type: "success" };
  } catch (error) {
    //console.error("Error= ", error);
    return HandleError(error);
  }
}
export type Add_Edit_BookmarkType = {
  data: addBookmarkDataType | editBookmarkDataType;
  type: "edit" | "add";
};
export async function add_edit_BookMarkService(
  props: Add_Edit_BookmarkType,
): Promise<Add_Edit_BookmarkResponseReturnType> {
  if (props.type === "add") return await addBookMark(props.data);
  else return await editBookMark(props.data as editBookmarkDataType);
}
