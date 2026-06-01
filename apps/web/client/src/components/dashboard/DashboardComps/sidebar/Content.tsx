import { useRef } from "react";
import { animateIconUsingRef, type IconHandle } from "@repo/ui";
import { ChevronRightIcon, LoaderIcon, Home, Folder, Tag, Share2 } from "lucide-react";
import { useNavigate } from "react-router";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui";
import { useDashboardFetch } from "@/hooks/react-query-hooks/useDashboardFetch";
import { MapCategoryWithIcon } from "@/lib/utils/mapCategoryIcon";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useFetchSharedProfile } from "@/hooks/react-query-hooks/useFetchSharedProfile";
import type { sharedProfileDataType } from "@/services/fetchSharedProfileService";

export function SideBarContentComp() {
  return (
    <SidebarContent>
      {/* section for library comps like- all , tags etc */}
      <SidebarGroup>
        <SidebarGroupContent>
          <SideBar_Menu />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

function SideBar_Menu() {
  const isSharedProfileRouteHash = useSelector((state: RootState) => state.ui.isSharedProfileRouteHash)
  // loading and error already handled in dashboard.tsx page
  const DashboardData = useDashboardFetch({ enabled: isSharedProfileRouteHash ? false : true });
  const SharedData = useFetchSharedProfile(isSharedProfileRouteHash || "", { enabled: isSharedProfileRouteHash ? true : false });

  const { data: response, isLoading } = isSharedProfileRouteHash ? SharedData : DashboardData;

  const allContent = response?.pages.flatMap((page) => {
    if (page.type !== 'success') return [];
    if (isSharedProfileRouteHash) {
      // shared profile returns flat items — wrap them into { contentTable } shape
      return (page.data as sharedProfileDataType[])
        .map((item) => ({ contentTable: item, ContentShareLinkTable: null }));
    }
    return page.data as import("@/Types/dashboard").dashboardFetchDataType[];
  });

  const uniqueTags = [
    ...new Set(allContent?.flatMap((x) => x.contentTable.tags)),
  ];
  const uniqueCategories = [
    ...new Set(allContent?.flatMap((x) => x.contentTable.category)),
  ];
  const navigate = useNavigate();

  function handleSidebarClick(type: string, value?: string | null) {
    if (type === "home") {
      navigate("");
    } else if (type === "shared") {
      navigate("?shared=share");
    } else if (type === "category" && value) {
      navigate(`?category=${value}`);
    } else if (type === "tag" && value) {
      navigate(`?tag=${value}`);
    }
  }

  function MapCategoryWithIconComp({ category }: { category: typeof uniqueCategories[0] }) {
    const AnimateRef = useRef<IconHandle>(null);
    const Icon = MapCategoryWithIcon(category);
    return (
      <button
        onClick={() => handleSidebarClick("category", category)}
        className="flex w-full gap-1 rounded border border-transparent px-3 py-1 font-sans text-xs text-zinc-500 transition-colors duration-200 hover:border-zinc-600 hover:text-black dark:text-zinc-400 hover:dark:text-white"
        key={category}
        {...animateIconUsingRef(AnimateRef)}
      >
        <span className="flex gap-2">
          <Icon ref={AnimateRef} className="inline-block" size={16} />{" "}
          {category}
        </span>
      </button>
    );
  }

  if (isLoading) return <LoaderIcon />;

  return (
    <SidebarMenu className="gap-3">
      {/* for home*/}
      <hr />
      <SidebarMenuItem key={"home"} className="group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-center">
        <SidebarMenuButton
          className="text-xs flex gap-2 items-center justify-start group-data-[state=collapsed]:justify-center"
          onClick={() => handleSidebarClick("home")}
          tooltip="Home"
        >
          <Home className="size-4 shrink-0" />
          <span className="group-data-[state=collapsed]:hidden">Home</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* for categories */}
      <Collapsible defaultOpen className="group/collapsible group-data-[state=collapsed]:hidden">
        <SidebarMenuItem className="space-y-2">
          <hr />
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="group flex gap-1 text-xs">
              <Folder className="size-4 shrink-0" />
              <span>Categories</span>
              <ChevronRightIcon className="ml-auto h-3! group-data-[state=open]:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start justify-between gap-1 px-9 pl-6">
            {uniqueCategories.map((category) => {
              return <div key={category}><MapCategoryWithIconComp category={category} /></div>
            })}
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
      <SidebarMenuItem className="hidden group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-center" key="categories-collapsed">
        <SidebarMenuButton className="text-xs flex justify-center" tooltip="Categories">
          <Folder className="size-4 shrink-0" />
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* for tags */}
      <hr />
      <Collapsible defaultOpen className="group/collapsible group-data-[state=collapsed]:hidden">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="group flex gap-1 text-xs">
              <Tag className="size-4 shrink-0" />
              <span>Tags</span>
              <ChevronRightIcon className="ml-auto h-3! group-data-[state=open]:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start justify-between gap-1 px-9 pl-6">
            {uniqueTags.map((tag) => {
              return (
                <button
                  onClick={() => handleSidebarClick("tag", tag)}
                  className="flex w-full gap-1 rounded border border-transparent px-3 py-1 text-start font-sans text-xs text-zinc-500 transition-colors duration-200 hover:border-zinc-600 hover:text-black dark:text-zinc-400 hover:dark:text-white"
                  key={tag}
                >
                  #{tag}
                </button>
              );
            })}
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
      <SidebarMenuItem className="hidden group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-center" key="tags-collapsed">
        <SidebarMenuButton className="text-xs flex justify-center" tooltip="Tags">
          <Tag className="size-4 shrink-0" />
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/* for shared*/}
      <hr />
      <SidebarMenuItem key={"shared"} className="group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-center">
        <SidebarMenuButton
          className="text-xs flex gap-2 items-center justify-start group-data-[state=collapsed]:justify-center"
          onClick={() => handleSidebarClick("shared")}
          tooltip="Shared"
        >
          <Share2 className="size-4 shrink-0" />
          <span className="group-data-[state=collapsed]:hidden">Shared</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <hr />
    </SidebarMenu>
  );
}
