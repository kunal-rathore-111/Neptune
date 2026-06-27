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



const UserInitialRoute = BackendInitalRoute + '/user';

export const FetchDataUrl = UserInitialRoute + "/content/fetch";

export const ResetPasswordUrl = UserInitialRoute + '/account/reset-password';

export const SendOtpUrl = UserInitialRoute + '/otp/email/send-otp';
export const ValidateOtpUrl = UserInitialRoute + '/otp/validate-otp';

const UserContentInitialRoute = UserInitialRoute + '/content';

export const AddBookmarkUrl = UserContentInitialRoute + "/add";
export const DeleteBookmarkUrl = UserContentInitialRoute + "/delete";
export const UpdateBookmarkUrl = UserContentInitialRoute + "/update";

export const ToggleContentShareUrl =
  UserInitialRoute + "/share-content/public/update-share-link";

export const SharedContentUrl =
  UserInitialRoute + "/share-content/public";

export const FetchUserProfileUrl =
  UserInitialRoute + "/account/user-profile";

export const UserProfileShareInitialUrl =
  UserInitialRoute + "/share-user";



export const UserSharedProfileFetchUrl = UserProfileShareInitialUrl + '/profile';

export const FetchUserProfileShareHashUrl =
  UserProfileShareInitialUrl + "/get-user-share";

export const ToggleUserProfileShareUrl =
  UserProfileShareInitialUrl + "/toggle-user-share";


export const UpdatePasswordUrl =
  UserInitialRoute + "/account/update-user-password";

export const DeleteAccountUrl =
  UserInitialRoute + "/account/delete-user-account";

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
