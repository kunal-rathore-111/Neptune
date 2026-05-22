import { SidebarRail } from "@repo/ui";
import { Sidebar } from "@repo/ui";
import { SideBarTitle } from "./Title";
import { SideBarContentComp } from "./Content";
import { SideBarFooterComp } from "./Footer";

type propsType = {
  isSharedDashboard?: boolean
}

export function AppSideBar({ isSharedDashboard }: propsType) {
  return (
    <Sidebar className="dark:bg-stone-950" collapsible="icon">
      <SideBarTitle />
      <SideBarContentComp />
      <SideBarFooterComp isSharedDashboard={isSharedDashboard} />
      <SidebarRail />
    </Sidebar>
  );
}
