import type { ServiceResponse } from "@/services/handleError";
import { toast } from "@repo/ui";
import type { NavigateFunction } from "react-router";

export function HandleResponseUtil(
  response: ServiceResponse,
  navigateTo: string | null,
  navigate: NavigateFunction | null,
) {
  response.type === "success"
    ? toast.success(response.message, { position: "top-center" })
    : toast.error(response.message, { position: "top-center" });
  // if usecase success then perform what need (basically need to redirect to dashboard of user)
  if (response.type === "success" && navigateTo && navigate) {
    navigate(navigateTo);
  }
  return;
}
