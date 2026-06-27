import { SignInUrl, SignOutUrl, SignUpUrl } from "@/api/urls";
import type { AuthMode } from "@/components/sign/Sign";
import axios from "axios";
import { HandleError, type ServiceResponse } from "./handleError";

type signInServiceType = {
  email: string;
  password: string;
};
type signUpServiceType = signInServiceType & {
  name: string;
};

export type signInUpFunctionType = {
  data: signInServiceType | signUpServiceType;
  mode: AuthMode;
};

async function signInService(
  data: signInServiceType,
): Promise<ServiceResponse> {
  // using axios cause it provides XSRF protection (security)
  try {
    // i can make this logic as common bw sign-in or sign-up
    const response = await axios({
      url: SignInUrl,
      method: "POST",
      data: data,
      withCredentials: true,
    });

    //console.error(response.data.userData);
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
      url: SignUpUrl,
      method: "POST",
      data: data,
      withCredentials: true,
    });
    return { message: response.data.message, type: "success" };
  } catch (error) {
    return HandleError(error);
  }
}

export async function signInUpService({
  data,
  mode,
}: signInUpFunctionType): Promise<ServiceResponse> {
  if (mode === "signin") return await signInService(data as signInServiceType);
  else return await signUpService(data as signUpServiceType);
}

export async function signOutService(): Promise<ServiceResponse> {
  try {
    const response = await axios(SignOutUrl, {
      method: "POST",
      withCredentials: true,
    });

    return { message: response.data.message, type: "success" };
  } catch (error) {
    /* here the no error thrown from server code probably cause there is no middleware but still using cause what if there will server is down */
    return HandleError(error);
  }
}
