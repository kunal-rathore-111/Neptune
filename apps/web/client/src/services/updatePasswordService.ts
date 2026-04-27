import { axiosInstance } from "@/api/axiosInstance";
import { UpdatePasswordUrl } from "@/api/urls";
import { HandleError } from "./handleError";

export type updatePasswordServiceInputType = {
  email: string;
  password: string;
  newPassword: string;
};
export async function updatePasswordService(
  props: updatePasswordServiceInputType,
) {
  try {
    const response = await axiosInstance(UpdatePasswordUrl, {
      data: props,
      method: "PATCH",
    });
    return { message: response.data.message, type: "success" };
  } catch (error) {
    return HandleError(error);
  }
}
