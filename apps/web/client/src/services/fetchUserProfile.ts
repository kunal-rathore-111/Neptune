import { FetchUserProfileUrl } from "@/api/urls";
import { HandleError, type ErrorServiceResponse } from "./handleError";
import { axiosInstance } from "@/api/axiosInstance";

type fethcUserProfileServiceResponseType = {
  type: "success";
  userProfileData: {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export async function fetchUserProfileService(): Promise<
  fethcUserProfileServiceResponseType | ErrorServiceResponse
> {
  try {
    const response = await axiosInstance(FetchUserProfileUrl, {
      method: "GET",
    });

    return { type: "success", userProfileData: response.data.userProfileData };
  } catch (error) {
    return HandleError(error);
  }
}
