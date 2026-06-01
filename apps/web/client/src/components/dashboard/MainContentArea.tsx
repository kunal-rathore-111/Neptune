import { cn } from "@repo/libs";
import {
  ButtonsClass,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Sheet,
  SheetContent,
  ThemeToggleButton,
} from "@repo/ui";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { CircleX, Search } from "lucide-react";
import DashboardDataList from "./DashboardComps/DashboardDataList";
import { useEffect, useRef, useState } from "react";
import { Add_Edit_BookMarkCard } from "./DashboardComps/Add_Edit_Bookmark";
import { LongContentCard } from "./DashboardComps/LongContentCard";
import { useDashboardFetch } from "@/hooks/react-query-hooks/useDashboardFetch";
import { LoaderIcon } from "@repo/icons";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setAddBookMarkState, setEditCardState, setLongSelectedCard } from "@/store/uiSlice";
import { useSearchParams } from "react-router";
import { useInView } from "framer-motion";
import { useFetchSharedProfile } from "@/hooks/react-query-hooks/useFetchSharedProfile";
import { all } from "axios";


export function DashboardMainContentArea() {



  return (
    <section className="relative flex min-h-screen w-full flex-col py-10 lg:px-8">
      <DashboardSection />
    </section>
  );
}

function DashboardSection() {
  const addBookMarkState = useSelector(
    (state: RootState) => state.ui.addBookMarkState,
  );
  const editCardState = useSelector(
    (state: RootState) => state.ui.editCardState,
  );
  const selectedCard = useSelector(
    (state: RootState) => state.ui.longSelectedCard,
  );

  const isSharedProfileRouteHash = useSelector((state: RootState) => state.ui.isSharedProfileRouteHash)

  const dispatch = useDispatch();

  const DashboardData = useDashboardFetch({ enabled: !isSharedProfileRouteHash });

  const SharedProfileData = useFetchSharedProfile(isSharedProfileRouteHash || "", { enabled: !!isSharedProfileRouteHash });


  const { data: dashboardData, fetchNextPage, isFetchingNextPage, hasNextPage } = isSharedProfileRouteHash ? SharedProfileData : DashboardData;

  const [searchString, setSearchString] = useState<string>("");

  const allContent: dashboardFetchDataType[] | undefined = dashboardData?.pages.flatMap((page): dashboardFetchDataType[] => {
    if (page.type !== "success") return [];
    if (isSharedProfileRouteHash) {
      return (page.data as dashboardFetchDataType["contentTable"][]).map(
        (item) => ({ contentTable: item, ContentShareLinkTable: null }),
      );
    }
    return page.data as dashboardFetchDataType[];
  });

  // for sentinal (auto fetch on reaching end)
  const endRef = useRef(null);
  const isEndReach = useInView(endRef);


  useEffect(() => {
    if (isEndReach && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isEndReach])


  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const shared = searchParams.get("shared");


  let categorizedData = allContent;

  if (category)
    categorizedData = allContent?.filter(
      (x) => x.contentTable.category === category,
    );
  else if (tag)
    categorizedData = allContent?.filter((x) =>
      x.contentTable.tags?.includes(tag),
    );
  else if (shared) {
    categorizedData = allContent?.filter((x) => x.ContentShareLinkTable);
  }


  const cleanSearchString = searchString.toLowerCase().trim();

  const finalDisplayData = categorizedData && searchString ? categorizedData.filter(data => {
    const { title, category, description, link, tags } = data.contentTable;
    return (
      title.toLowerCase().includes(cleanSearchString) ||
      description?.toLowerCase().includes(cleanSearchString) ||
      category?.toLowerCase().includes(cleanSearchString) ||
      link?.toLowerCase().includes(cleanSearchString) ||
      tags?.some((x: any) => x.toLowerCase().includes(cleanSearchString))
    )
  }) : categorizedData;

  return (
    <>
      <div className="w-full space-y-10">
        {/* This container must be w-full to allow justify-between to work */}
        <div className="flex w-full flex-col gap-3">
          {/* Header: justify-between spreads the H1 and Button */}
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-semibold">All Bookmarks</h1>
            <div className="flex gap-4 items-center ">
              {!isSharedProfileRouteHash &&
                <button
                  className={cn(ButtonsClass, "h-fit p-2 text-xs")}
                  onClick={() => dispatch(setAddBookMarkState(true))}
                >
                  Add Bookmark
                </button>}
              <ThemeToggleButton className="p-2" />
            </div>
          </div>

          <InputGroup className="sm:max-w-xs lg:max-w-sm">
            <InputGroupInput
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value)
              }}
              placeholder="Search here..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">

              {searchString
                &&
                <CircleX className="cursor-pointer " onClick={() => setSearchString('')} />
              }

              {finalDisplayData?.length} results
            </InputGroupAddon>
          </InputGroup>
        </div>
        {/*  list of cards */}
        <DashboardDataList finalDisplayData={finalDisplayData} />

        {/* sentinal comp for showing loading on end */}
        {
          <div ref={endRef} className=" flex items-center justify-center">
            {isEndReach && hasNextPage && isFetchingNextPage && <LoaderIcon />}
          </div>
        }
      </div>

      {/* render the add card on full screen */}
      {addBookMarkState && (
        <Sheet open={addBookMarkState} onOpenChange={() => dispatch(setAddBookMarkState(false))}>
          <SheetContent className="border-none! bg-transparent! shadow-none! p-0! flex! items-center justify-center w-full! max-w-full! h-full! inset-0!" showCloseButton={false}>
            <Add_Edit_BookMarkCard type="add" />
          </SheetContent>
        </Sheet>
      )}

      {/* render the edit card for the relevant card */}
      {editCardState && (
        <Sheet open={!!editCardState} onOpenChange={() => dispatch(setEditCardState(null))}>
          <SheetContent className="border-none! bg-transparent! shadow-none! p-0! flex! items-center justify-center w-full! max-w-full! h-full! inset-0!" showCloseButton={false}>
            <Add_Edit_BookMarkCard type="edit" />
          </SheetContent>
        </Sheet>
      )}

      {/* render the card dashboardData on full screen */}
      {selectedCard && (
        <Sheet open={!!selectedCard} onOpenChange={() => dispatch(setLongSelectedCard(null))}>
          <SheetContent className="border-none! bg-transparent! shadow-none! p-0! flex! items-center justify-center w-full! max-w-full! h-full! inset-0!" showCloseButton={false}>
            <LongContentCard />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
