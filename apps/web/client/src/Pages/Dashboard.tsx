import { DashboardMainContentArea } from "@/components/dashboard/MainContentArea";
import { AppSideBar } from "@/components/dashboard/DashboardComps/sidebar/SideBarLayout";
import { SidebarProvider, toast } from "@repo/ui";
import { useFetchUserProfile } from "@/hooks/react-query-hooks/useFetchUserProfile";
import LoadingPage from "./Loading";
import ErrorPage from "./ErrorPage";
import { useDashboardFetch } from "@/hooks/react-query-hooks/useDashboardFetch";
import { ChatBotDrawerComp } from "@/components/dashboard/DashboardComps/ChatbotDrawer";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useFetchSharedProfile } from "@/hooks/react-query-hooks/useFetchSharedProfile";

export default function Dashboard() {

  const isSharedProfileRouteHash = useSelector((state: RootState) => state.ui.isSharedProfileRouteHash);

  const sharedProfile = useFetchSharedProfile(isSharedProfileRouteHash || "", {
    enabled: isSharedProfileRouteHash ? true : false
  })

  const userProfile = useFetchUserProfile({ enabled: !isSharedProfileRouteHash })


  const dashboardData = useDashboardFetch({ enabled: !isSharedProfileRouteHash });

  const { isLoading, isError, error } = isSharedProfileRouteHash ? sharedProfile : userProfile;

  const {
    isLoading: isLoadingDashboardData,
    isError: isErrorInLoadingDashboardData,
    error: dashboardDataError,
  } = isSharedProfileRouteHash ? sharedProfile : dashboardData;


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
        <AppSideBar isSharedDashboard={isSharedProfileRouteHash ? true : false}></AppSideBar>
        <main className="flex w-screen ">
          <DashboardMainContentArea />
          {/* handles the chatbot icon+the side drawer */}
          {!isSharedProfileRouteHash && <ChatBotDrawerComp />}
        </main>

      </SidebarProvider>
    </>
  );
}
