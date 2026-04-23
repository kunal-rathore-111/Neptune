import { FetchDataUrl } from "@/api/urls";
import axios from "axios";
import { HandleError } from "./handleError";
import type { dashboardFetchDataType } from "@/Types/dashboard";

type FetchDataType =
  | { type: "error"; message: string }
  | { data: dashboardFetchDataType[]; type: "success"; message: string };

export async function fetchData(): Promise<FetchDataType> {
  try {
    // console.error("calling fetchdata");
    const response = await axios(FetchDataUrl, {
      method: "GET",
      withCredentials: true,
    });
    //console.log(response.data);
    return {
      message: response.data.message,
      data: response.data.data,
      type: "success",
    };
  } catch (error) {
    return HandleError(error);
  }
}
