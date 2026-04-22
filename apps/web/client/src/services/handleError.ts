import { isAxiosError } from "axios";

export type ServiceResponse =
  | { message: string; type: "error" }
  | {
      message: string;
      type: "success";
    };

type ErrorServiceResponse = {
  message: string;
  type: "error";
};

type BackendError = {
  requestId?: string;
  errorType?: string;
  message?: string;
  status?: "error";
};

// function to handle Error
export function HandleError(error: unknown): ErrorServiceResponse {
  let message = "Something went wrong";
  if (isAxiosError<BackendError>(error)) {
    // console.error("Error- ", error.response?.data);
    if (
      error.response?.data.message &&
      error.response.data.errorType !== "ServerError"
    )
      message = error.response.data.message;
  }
  return { message: message, type: "error" };
}
