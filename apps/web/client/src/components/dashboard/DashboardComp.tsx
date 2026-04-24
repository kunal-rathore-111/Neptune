import { SidebarProvider } from "@repo/ui";
import { DashboardMainContentArea } from "./DashboardComps/MainContentArea";
import { AppSideBar } from "./DashboardComps/SideBarLayout";

export function FullDashboardPage() {
  return (
    <SidebarProvider className="[--sidebar-width:8rem] md:[--sidebar-width:14rem] lg:[--sidebar-width:16rem]">
      <AppSideBar></AppSideBar>
      <main className="flex w-screen">
        <DashboardMainContentArea />
      </main>
    </SidebarProvider>
  );
}
