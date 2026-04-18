import type { AuthMode } from "@/components/sign/Sign";

type signInServiceType = {
  email: string;
  password: string;
};
type signUpServiceType =
  | signInServiceType
  | {
      username: string;
    };

type signInUpFunctionType = {
  data: signInServiceType | signUpServiceType;
  mode: AuthMode;
};

function signInService(data: signInServiceType) {
  console.log("SignIn-", data);
  return "hi";
}

function signUpService(data: signUpServiceType) {
  console.log("SignUp-", data);
  return "hi";
}

export function signInUpFunction({ data, mode }: signInUpFunctionType) {
  if (mode === "signin") return signInService(data as signInServiceType);
  else return signUpService(data);
}
