import { DashboardMainContentArea } from "@/components/dashboard/MainContentArea";
import { AppSideBar } from "@/components/dashboard/DashboardComps/SideBarLayout";
import { SidebarProvider, toast } from "@repo/ui";
import { useFetchUserProfile } from "@/hooks/react-query-hooks/useUserProfile";
import LoadingPage from "./Loading";
import ErrorPage from "./ErrorPage";
import { useDashboardFetch } from "@/hooks/react-query-hooks/useDashboardFetch";
import { ChatBotDrawerComp } from "@/components/dashboard/DashboardComps/ChatbotDrawer";

export default function Dashboard() {
  const { isLoading, isError, error } = useFetchUserProfile();
  const {
    isLoading: isLoadingDashboardData,
    isError: isErrorInLoadingDashboardData,
    error: dashboardDataError,
  } = useDashboardFetch();


  if (isError || isErrorInLoadingDashboardData) {
    if (isError) {
      toast.error(error.message, { position: "top-center" });
      return <ErrorPage message={error.message} />;
    } else {
      toast.error(dashboardDataError?.message, { position: "top-center" });
      return <ErrorPage message={dashboardDataError?.message} />;
    }
  } // interceptor will redirect on 401 but need to handle other error like database and any other
  if (isLoading || isLoadingDashboardData) return <LoadingPage />;

  return (
    <>
      <SidebarProvider className="[--sidebar-width:8rem] md:[--sidebar-width:14rem] lg:[--sidebar-width:16rem]">
        <AppSideBar></AppSideBar>
        <main className="flex w-screen ">
          <DashboardMainContentArea />
          {/* handles the chatbot icon+the side drawer */}
          <ChatBotDrawerComp />
        </main>

      </SidebarProvider>
    </>
  );
}
