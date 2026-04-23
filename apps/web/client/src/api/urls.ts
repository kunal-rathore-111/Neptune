const env = import.meta.env;

// --------Backned URLs--------
const BackendInitalRoute =
  env.VITE_MODE === "dev"
    ? env.VITE_DEV_BACKEND_BASE_URL
    : env.VITE_PROD_BACKEND_BASE_URL;
if (!BackendInitalRoute) throw Error("No Base URL found for BACKEND");

export const SignInUrl = BackendInitalRoute + "/sign-in";

export const SignUpUrl = BackendInitalRoute + "/sign-up";

export const SignOutUrl = BackendInitalRoute + "/sign-out";

export const FetchDataUrl = BackendInitalRoute + "/user/content/fetch"; // to fetch user data for dashboard

export const AddBookmarkUrl = BackendInitalRoute + "/user/content/add";
export const DeleteBookmarkUrl = BackendInitalRoute + "/user/content/delete";
export const UpdateBookmarkUrl = BackendInitalRoute + "/user/content/update";
export const ToggleContentShareUrl =
  BackendInitalRoute + "/user/share-content/public/update-share-link";

export const SharedContentUrl =
  BackendInitalRoute + "/user/share-content/public";

// --------Frontend URLs--------

const FrontendInitalRoute =
  env.VITE_MODE === "dev"
    ? env.VITE_DEV_FRONTEND_BASE_URL
    : env.VITE_PROD_FRONTEND_BASE_URL;
if (!FrontendInitalRoute) throw Error("No Base URL found for FRONTEND");

export const ContentShareUrl =
  FrontendInitalRoute + "/user/public/shared/content";
