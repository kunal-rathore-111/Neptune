const env = import.meta.env;

// --------Backned URLs--------
const BackendInitalRoute: string =
  env.VITE_MODE === "dev"
    ? env.VITE_DEV_BACKEND_BASE_URL
    : env.VITE_PROD_BACKEND_BASE_URL;
if (!BackendInitalRoute) throw Error("No Base URL found for BACKEND");

export const SignInUrl = BackendInitalRoute + "/sign-in";

export const SignUpUrl = BackendInitalRoute + "/sign-up";

export const SignOutUrl = BackendInitalRoute + "/sign-out";

export const FetchDataUrl = BackendInitalRoute + "/user/content/fetch";

export const AddBookmarkUrl = BackendInitalRoute + "/user/content/add";
export const DeleteBookmarkUrl = BackendInitalRoute + "/user/content/delete";
export const UpdateBookmarkUrl = BackendInitalRoute + "/user/content/update";
export const ToggleContentShareUrl =
  BackendInitalRoute + "/user/share-content/public/update-share-link";

export const SharedContentUrl =
  BackendInitalRoute + "/user/share-content/public";

export const FetchUserProfileUrl =
  BackendInitalRoute + "/user/account/user-profile";

export const UserProfileShareInitialUrl =
  BackendInitalRoute + "/user/share-user";

export const UserSharedProfileFetchUrl = UserProfileShareInitialUrl + '/profile';

export const FetchUserProfileShareHashUrl =
  UserProfileShareInitialUrl + "/get-user-share";

export const ToggleUserProfileShareUrl =
  UserProfileShareInitialUrl + "/toggle-user-share";


export const UpdatePasswordUrl =
  BackendInitalRoute + "/user/account/update-user-password";

export const DeleteAccountUrl =
  BackendInitalRoute + "/user/account/delete-user-account";

export const MagicFillUrl = BackendInitalRoute + "/ai/magic-fill";

export const ChatUrl = BackendInitalRoute + "/ai/global-chat";




// --------Frontend URLs--------
const FrontendInitalRoute =
  env.VITE_MODE === "dev"
    ? env.VITE_DEV_FRONTEND_BASE_URL
    : env.VITE_PROD_FRONTEND_BASE_URL;
if (!FrontendInitalRoute) throw Error("No Base URL found for FRONTEND");

export const ContentShareUrl =
  FrontendInitalRoute + "/user/public/shared/content";

export const UserSharedProfileUrl =
  FrontendInitalRoute + "/user/public/shared/profile";



// -----------Extra URLs/Social
export const GithubRepoUrl = 'https://github.com/kunal-rathore-111/Neptune';
export const EmailLink =
  "https://mail.google.com/mail/?view=cm&fs=1&to=kunalworkspace111@gmail.com";

export const GithubProfile = "https://github.com/kunal-rathore-111";
"https://github.com/kunal-rathore-111/2ndMind-frontend";

export const Twitter = "";
