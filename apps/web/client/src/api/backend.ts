const env = import.meta.env;

const InitalRoute =
  env.VITE_MODE === "dev"
    ? env.VITE_DEV_BACKEND_BASE_URL
    : env.VITE_PROD_BACKEND_BASE_URL;
if (!InitalRoute) throw Error("No Base URL found for backend");

export const SignInRoute = InitalRoute + "/sign-in";
export const SignUpRoute = InitalRoute + "/sign-up";
