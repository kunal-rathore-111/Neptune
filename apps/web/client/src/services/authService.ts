import { SignInRoute, SignUpRoute } from "@/api/backend";
import type { AuthMode } from "@/components/sign/Sign";
import axios, { isAxiosError } from "axios";

type signInServiceType = {
  email: string;
  password: string;
};
type signUpServiceType = signInServiceType & {
  username: string;
};

type signInUpFunctionType = {
  data: signInServiceType | signUpServiceType;
  mode: AuthMode;
};

type ServiceResponse = {
  message: string;
  type: "error" | "success";
};

async function signInService(
  data: signInServiceType,
): Promise<ServiceResponse> {
  // using axios cause it provides XSRF protection (security)
  try {
    // i can make this logic as common bw sign-in or sign-up
    const response = await axios({
      url: SignInRoute,
      method: "POST",
      data: data,
      withCredentials: true,
    });

    return { message: response.data.message, type: "success" };
  } catch (error) {
    return HandleError(error);
  }
}

async function signUpService(
  data: signUpServiceType,
): Promise<ServiceResponse> {
  try {
    const response = await axios({
      url: SignUpRoute,
      method: "POST",
      data: data,
      withCredentials: true,
    });
    return { message: response.data.message, type: "success" };
  } catch (error) {
    return HandleError(error);
  }
}

export async function signInUpFunction({
  data,
  mode,
}: signInUpFunctionType): Promise<ServiceResponse> {
  if (mode === "signin") return await signInService(data as signInServiceType);
  else return await signUpService(data as signUpServiceType);
}

type BackendError = {
  requestId?: string;
  errorType?: string;
  message?: string;
  status?: "error";
};

// function to handle Error
function HandleError(error: unknown): ServiceResponse {
  let message = "Something went wrong";
  if (isAxiosError<BackendError>(error)) {
    console.error("Error- ", error.response?.data);
    if (
      error.response?.data.message &&
      error.response.status !== 500 &&
      error.response.data.errorType !== "ServerError"
    )
      message = error.response.data.message;
  }
  return { message: message, type: "error" };
}
