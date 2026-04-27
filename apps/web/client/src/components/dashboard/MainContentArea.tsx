import { cn } from "@repo/libs";
import {
  ButtonsClass,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  SidebarTrigger,
  toast,
  useSidebar,
} from "@repo/ui";
import { Search } from "lucide-react";
import DashboardDataList from "./DashboardComps/DashboardDataList";
import { useEffect, useState } from "react";
import { Add_Edit_BookMarkCard } from "./DashboardComps/Add_Edit_Bookmark";
import { useDashboardFetch } from "@/hooks/react-query-hooks/useDashboardFetch";
import { LoaderIcon } from "@repo/icons";
import { ErrorComp } from "@/components/ErrorComp";
export function DashboardMainContentArea() {
  const { isLoading, error, isError } = useDashboardFetch();

  useEffect(() => {
    if (isError) {
      toast.error(error.message, { position: "top-center" });
    }
  }, [error, isError]);

  const { open } = useSidebar();
  return (
    <section className="relative flex min-h-screen w-full flex-col py-10 lg:px-8">
      <SidebarTrigger
        className={cn(
          "w-fit p-1",
          open ? "cursor-w-resize" : "cursor-e-resize",
        )}
      />

      {/* if loading show loader */}
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <LoaderIcon />
        </div>
      ) : isError ? (
        <div className="flex h-full w-full items-center justify-center">
          {<ErrorComp message={error.message} />}
        </div>
      ) : (
        /*  if no error then show the dashboard section */
        <DashboardSection />
      )}
    </section>
  );
}

function DashboardSection() {
  const [addCardState, setOpenAddCard] = useState<boolean>(false);
  return (
    <>
      <div className="w-full space-y-10">
        {/* This container must be w-full to allow justify-between to work */}
        <div className="flex w-full flex-col gap-3">
          {/* Header: justify-between spreads the H1 and Button */}
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-semibold">All Bookmarks</h1>
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
        <DashboardDataList />
      </div>

      {/* render the add card on full screen */}
      {addCardState && (
        <Add_Edit_BookMarkCard setOpenAdd_Edit_Card={setOpenAddCard} />
      )}
    </>
  );
}
