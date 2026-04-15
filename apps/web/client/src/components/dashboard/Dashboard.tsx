import { ButtonsClass } from "@/lib/constants/styles";
import { cn } from "@repo/libs/utils";
import { Search } from "lucide-react";
import { useState } from "react";
import AddBookMarkCard from "./DashboardComps/AddBookmark";
import { AppSideBar } from "./DashboardComps/SideBarLayout";
import { SidebarProvider, SidebarTrigger } from "@repo/ui/sidebar/sidebar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@repo/ui/Form/input-group";
import DashboardComp from "./DashboardComps/DashboardComp";

export function FullDashboardPage() {
  const [addCardState, setOpenAddCard] = useState(false);

  return (
    <SidebarProvider className="[--sidebar-width:8rem] md:[--sidebar-width:14rem] lg:[--sidebar-width:16rem]">
      <AppSideBar />
      <main className="relative flex flex-col py-10 lg:px-8">
        <SidebarTrigger className="w-fit" />
        <div className="space-y-3">
          {/* Header of dashboard */}
          <div className="flex justify-between">
            <div className="text-start">
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

        <DashboardComp />

        {/* render the add card on full screen */}
        {addCardState && <AddBookMarkCard setOpenAddCard={setOpenAddCard} />}
      </main>
    </SidebarProvider>
  );
}
