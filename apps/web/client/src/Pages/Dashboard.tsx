import { DashboardMainContentArea } from "@/components/dashboard/MainContentArea";
import { AppSideBar } from "@/components/dashboard/DashboardComps/SideBarLayout";
import { SidebarProvider, toast } from "@repo/ui";
import { useFetchUserProfile } from "@/hooks/react-query-hooks/useUserProfile";
import LoadingPage from "./Loading";
import ErrorPage from "./ErrorPage";

export default function Dashboard() {
  const { isLoading, isError, error } = useFetchUserProfile();

  if (isError) {
    toast.error(error.message, { position: "top-center" });
    return <ErrorPage message={error.message} />;
  } // interceptor will redirect on 401 but need to handle other error like database and any other
  if (isLoading) return <LoadingPage />;
  return (
    <>
      <SidebarProvider className="[--sidebar-width:8rem] md:[--sidebar-width:14rem] lg:[--sidebar-width:16rem]">
        <AppSideBar></AppSideBar>
        <main className="flex w-screen">
          <DashboardMainContentArea />
        </main>
      </SidebarProvider>
    </>
  );
}
