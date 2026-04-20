import { ButtonsClass } from "@/lib/constants/styles";
import { cn } from "@repo/libs";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import AddBookMarkCard from "./DashboardComps/AddBookmark";
import { AppSideBar } from "./DashboardComps/SideBarLayout";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui";
import DashboardComp from "./DashboardComps/DashboardComp";
import { fetchData } from "@/services/fetchData";
import { HandleResponseUtil } from "@/lib/utils/handleResponseUtil";
import LoadingPage from "@/Pages/Loading";
import type { dashboardFetchDataType } from "@/Types/dashboard";

export function FullDashboardPage() {
  const [addCardState, setOpenAddCard] = useState<boolean>(false);
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
      {isLoading ? (
        <LoadingPage />
      ) : (
        <SidebarProvider className="[--sidebar-width:8rem] md:[--sidebar-width:14rem] lg:[--sidebar-width:16rem]">
          <AppSideBar />
          <main className="relative flex min-h-screen w-full flex-col py-10 lg:px-8">
            <SidebarTrigger className="w-fit" />
            {dashboardData.length ? (
              <div className="space-y-3">
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
                    <InputGroupAddon align="inline-end">
                      12 results
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                <DashboardComp dashboardData={dashboardData} />
              </div>
            ) : (
              <div>"NoContentPresentComp" </div>
            )}

            {/* render the add card on full screen */}
            {addCardState && (
              <AddBookMarkCard setOpenAddCard={setOpenAddCard} />
            )}
          </main>
        </SidebarProvider>
      )}
    </>
  );
}
