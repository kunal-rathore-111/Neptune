import { FetchDataUrl } from "@/api/urls";
import axios from "axios";
import { HandleError } from "./handleError";
import type { dashboardFetchDataType } from "@/Types/dashboard";

type FetchDataType =
  | { type: "error"; message: string }
  | {
    data: dashboardFetchDataType[]; type: "success"; message: string,
    pagination: {
      hasMoreContent: boolean,
      nextCursor: Date | undefined
    }
  };

export async function fetchDataService({ pageParam }: { pageParam: any }): Promise<FetchDataType> {
  try {
    // console.error("calling fetchdata");
    const response = await axios(FetchDataUrl + `?cursor=${pageParam}`, {
      method: "GET",
      withCredentials: true,
    });
    //console.error(response.data);
    return {
      message: response.data.message,
      data: response.data.data, // the bookmarks array
      type: "success",
      pagination: {
        hasMoreContent: response.data.pagination.hasMoreContent,
        nextCursor: response.data.pagination.nextCursor
      }
    };
  } catch (error) {
    return HandleError(error);
  }
}
