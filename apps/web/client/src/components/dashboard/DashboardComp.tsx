import { SidebarProvider } from "@repo/ui";
import { useEffect, useState } from "react";
import { fetchData } from "@/services/fetchData";
import { HandleResponseUtil } from "@/lib/utils/handleResponseUtil";
import LoadingPage from "@/Pages/Loading";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { DashboardMainContentArea } from "./DashboardComps/MainContentArea";
import { AppSideBar } from "./DashboardComps/SideBarLayout";

export function FullDashboardPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [dashboardData, setDashboardData] = useState<dashboardFetchDataType[]>(
    [],
  );

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      const response = await fetchData();
      setIsLoading(false);
      HandleResponseUtil(response, null, null);
      if (response.type === "success" && response.data) {
        setDashboardData(response.data);
      }
      return;
    }
    fetch();
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <SidebarProvider className="[--sidebar-width:8rem] md:[--sidebar-width:14rem] lg:[--sidebar-width:16rem]">
        <AppSideBar></AppSideBar>
        <DashboardMainContentArea dashboardData={dashboardData} />
      </SidebarProvider>
    </>
  );
}
