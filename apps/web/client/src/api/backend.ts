const env = import.meta.env;

const InitalRoute =
  env.VITE_MODE === "dev"
    ? env.VITE_DEV_BACKEND_BASE_URL
    : env.VITE_PROD_BACKEND_BASE_URL;
if (!InitalRoute) throw Error("No Base URL found for backend");

export const SignInUrl = InitalRoute + "/sign-in";
export const SignUpUrl = InitalRoute + "/sign-up";

export const SignOutUrl = InitalRoute + "/sign-out";

export const FetchDataUrl = InitalRoute + "/user/content/fetch"; // to fetch user data for dashboard

export const AddBookmarkUrl = InitalRoute + "/user/content/add";
export const DeleteBookmarkUrl = InitalRoute + "/user/content/delete";
