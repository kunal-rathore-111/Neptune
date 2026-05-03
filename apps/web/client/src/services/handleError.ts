import { isAxiosError } from "axios";

export type ServiceResponse =
  | { message: string; type: "error" }
  | {
      message: string;
      type: "success";
    };

export type ErrorServiceResponse = {
  message: string;
  type: "error";
  status: number;
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
  let status = 500;
  if (isAxiosError<BackendError>(error)) {
    if (
      error.response?.data.message &&
      error.response.data.errorType !== "ServerError"
    ) {
      message = error.response.data.message;
      status = error.response.status;
    }
  }
  return { message, type: "error", status };
}
