import axios from "axios";
import { HandleError, type ErrorServiceResponse } from "./handleError";
import { UserSharedProfileFetchUrl } from "@/api/urls";
import type { CategoryType } from "@repo/libs";

export type sharedProfileDataType = {
  id: string;
  title: string;
  description: string | null;
  link: string;
  category: CategoryType;
  tags: string[] | null;
  userId: string;
  createdDate: Date;
  updatedDate: Date;
};

type successFetchSharedProfileServiceResponseType = {
  type: "success";
  message: string;
  data: sharedProfileDataType[];
  pagination: {
    hasMoreContent: boolean;
    nextCursor: Date | undefined;
  };
};

type fetchSharedProfileServiceResponseType =
  | successFetchSharedProfileServiceResponseType
  | ErrorServiceResponse;

export async function fetchSharedProfileService(
  _pageParam: Date | undefined,
  share_hash: string,
): Promise<fetchSharedProfileServiceResponseType> {
  try {
    const response = await axios(
      UserSharedProfileFetchUrl + `/${share_hash}/`,
      { method: "GET" },
    );

    // Server returns { data: contentArray } — no pagination, no message
    const contentArray: sharedProfileDataType[] = response.data.data ?? [];

    return {
      type: "success",
      message: "ok",
      data: contentArray,
      pagination: {
        hasMoreContent: false,  // server fetches all at once, no cursor pagination
        nextCursor: undefined,
      },
    };
  } catch (error) {
    return HandleError(error);
  }
}
