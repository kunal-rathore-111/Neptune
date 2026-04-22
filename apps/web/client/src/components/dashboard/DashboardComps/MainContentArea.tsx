import { cn } from "@repo/libs";
import {
  ButtonsClass,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  SidebarTrigger,
} from "@repo/ui";
import { Search } from "lucide-react";
import DashboardDataList from "./DashboardDataList";
import { useState } from "react";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { Add_Edit_BookMarkCard } from "./Add_Edit_Bookmark";

type DashboardMainContentAreaType = {
  dashboardData: dashboardFetchDataType[];
};
export function DashboardMainContentArea({
  dashboardData,
}: DashboardMainContentAreaType) {
  const [addCardState, setOpenAddCard] = useState<boolean>(false);

  return (
    <main className="relative flex min-h-screen w-full flex-col py-10 lg:px-8">
      <SidebarTrigger className="w-fit p-1" />
      {dashboardData.length ? (
        <div className="space-y-10">
          <div className="space-y-3">
            {/* Header of dashboard */}
            <div className="flex justify-between">
              <div className="spac-y-2 text-start">
                <h1 className="text-2xl font-semibold"> All Bookmarks</h1>
                <p>8 bookmarks</p>
              </div>
              <button
                className={cn(ButtonsClass, "h-fit p-2 text-xs")}
                onClick={() => setOpenAddCard(!addCardState)}
              >
                Add Bookmark
              </button>
            </div>
            <InputGroup className="sm:max-w-xs lg:max-w-sm">
              <InputGroupInput placeholder="Search here..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
            </InputGroup>
          </div>
          {/*  list of cards */}
          <DashboardDataList dashboardData={dashboardData} />
        </div>
      ) : (
        <div>"NoContentPresentComp" </div>
      )}

      {/* render the add card on full screen */}
      {addCardState && (
        <Add_Edit_BookMarkCard setOpenAdd_Edit_Card={setOpenAddCard} />
      )}
    </main>
  );
}
