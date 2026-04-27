import { UserProfile } from "@/components/Profile/profileCard";
import { useFetchUserProfile } from "@/hooks/react-query-hooks/useUserProfile";
import ErrorPage from "./ErrorPage";
import { toast } from "@repo/ui";
import LoadingPage from "./Loading";

export default function UserProfilePage() {
  const { data: response, isPending, isError, error } = useFetchUserProfile();
  if (isError) {
    toast.error(error.message, { position: "top-center" });
    return <ErrorPage message={error.message} />;
  } // interceptor will redirect on 401 but need to handle other error like database and any other
  if (response?.type === "error") {
    toast.error(response.message, { position: "top-center" });
    return <ErrorPage message={response.message} />;
  } // interceptor will redirect on 401 but need to handle other error like database and any other
  if (isPending) return <LoadingPage />;

  const defaultValues = {
    username: response.userProfileData.username,
    email: response.userProfileData.email,
  };

  return (
    <main className="flex w-screen items-center justify-center">
      <UserProfile defaultValues={defaultValues} />
    </main>
  );
}
