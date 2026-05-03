import { NeptunePlanetIcon } from "@repo/icons";
import { ThemeToggleButton } from "@repo/ui";
import { PlusIcon } from "@repo/icons";
import { useRef, useState } from "react";
import { animateIconUsingRef, type IconHandle } from "@repo/ui";
import { Button } from "@repo/ui";
import { ChevronRightIcon, LoaderIcon } from "lucide-react";
import { SettingsIcon } from "@repo/icons";
import { useNavigate } from "react-router";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui";
import { useSignOut } from "@/hooks/react-query-hooks/useSignOut";
import { useFetchUserProfile } from "@/hooks/react-query-hooks/useUserProfile";
import { useDashboardFetch } from "@/hooks/react-query-hooks/useDashboardFetch";
import { MapCategoryWithIcon } from "@/lib/utils/mapCategoryIcon";
import { setAddBookMarkState } from "@/store/uiSlice";
import { useDispatch } from "react-redux";

export function AppSideBar() {
  return (
    <Sidebar className="dark:bg-stone-950">
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  );
}

function Header() {
  const navigate = useNavigate();
  const AnimateRef = useRef<IconHandle>(null);
  const dispatch = useDispatch();
  return (
    <SidebarHeader>
      <div className="flex flex-col gap-7 p-3">
        <div className="flex w-full items-center justify-between">
          <button
            className="flex cursor-pointer items-center justify-center font-medium md:gap-1 lg:gap-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <NeptunePlanetIcon size={20} className="inline-block" /> Neptune
          </button>
          <ThemeToggleButton />
        </div>
        <Button
          className="border-2 border-zinc-500/40 bg-transparent text-xs text-zinc-600 shadow-lg shadow-black/10 hover:bg-zinc-200 hover:text-black dark:text-zinc-400 dark:shadow-white/5 hover:dark:bg-zinc-800 dark:hover:text-white"
          asChild
          {...animateIconUsingRef(AnimateRef)}
        >
          <div
            className="flex gap-1"
            onClick={() => dispatch(setAddBookMarkState(true))}
          >
            <PlusIcon className="inline-block" size={18} ref={AnimateRef} />
            New Bookmark
          </div>
        </Button>
      </div>
    </SidebarHeader>
  );
}

function Content() {
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
  // loading and error already handled in dashboard.tsx page
  const { data: response, isLoading } = useDashboardFetch();

  const uniqueTags = [
    ...new Set(response?.data.flatMap((x) => x.contentTable.tags)),
  ];
  const uniqueCategories = [
    ...new Set(response?.data.flatMap((x) => x.contentTable.category)),
  ];
  const navigate = useNavigate();
  function handleSidebarClick(type: string, value?: string) {
    if (type === "home") {
      navigate("?");
    } else if (type === "shared") {
      navigate("?shared=share");
    } else if (type === "category" && value) {
      navigate(`?category=${value}`);
    } else if (type === "tag" && value) {
      navigate(`?tag=${value}`);
    }
  }
  if (isLoading) return <LoaderIcon />;
  return (
    <SidebarMenu className="">
      {/* for home*/}
      <SidebarMenuItem key={"home"}>
        <SidebarMenuButton
          className="text-xs"
          onClick={() => handleSidebarClick("home")}
        >
          Home
        </SidebarMenuButton>
      </SidebarMenuItem>
      {/* for categories */}
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem className="space-y-2">
          <CollapsibleTrigger asChild>
            {/* re creating the MenuButton to keep things simple (two buttons same work one in the SideBar_Menu and one is this-) */}
            <SidebarMenuButton className="group flex gap-1 text-xs">
              Categories
              <ChevronRightIcon className="ml-auto h-3! group-data-[state=open]:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start justify-between gap-1 px-9 pl-6">
            {uniqueCategories.map((category) => {
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
            })}
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>

      {/* for tags */}
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            {/* re creating the MenuButton to keep things simple (two buttons same work one in the SideBar_Menu and one is this-) */}
            <SidebarMenuButton className="group flex gap-1 text-xs">
              Tags
              <ChevronRightIcon className="ml-auto h-3! group-data-[state=open]:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col items-start justify-between gap-1 px-9 pl-6">
            {uniqueTags.map((tag) => {
              return (
                <button
                  onClick={() => handleSidebarClick("tag", tag)}
                  className="flex w-full gap-1 rounded border border-transparent px-3 py-1 font-sans text-xs text-zinc-500 transition-colors duration-200 hover:border-zinc-600 hover:text-black dark:text-zinc-400 hover:dark:text-white"
                  key={tag}
                >
                  #{tag}
                </button>
              );
            })}
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>

      {/* for shared*/}
      <SidebarMenuItem key={"shared"}>
        <SidebarMenuButton
          className="text-xs"
          onClick={() => handleSidebarClick("shared")}
        >
          Shared
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function Footer() {
  const { data } = useFetchUserProfile(); // already cathced via parent called (the dashboard pages)
  const AnimateRef = useRef<IconHandle>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  // to singout on clicking signout button in settings
  const { mutate: signOutMutation } = useSignOut();
  async function signOutHandler() {
    signOutMutation();
  }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem className="flex flex-col items-center gap-2 rounded-none border-y">
          {/* UserProfile_Username and settings */}
          <SidebarGroup className="flex-row gap-5 px-1 py-2">
            <SidebarMenuButton className="text-xs">
              <Avatar className="mr-1 inline-block h-6 w-6 transition-all duration-200 hover:scale-110">
                <AvatarImage
                  //need to update with userProfile
                  src={
                    "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg"
                  }
                  alt={"userProfileImage"}
                />
                <AvatarFallback>{""}</AvatarFallback>
              </Avatar>{" "}
              {data?.type === "success" ? (
                data.userProfileData.username
              ) : (
                <p> username</p>
              )}
            </SidebarMenuButton>
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="flex w-fit items-center justify-center border"
                  {...animateIconUsingRef(AnimateRef)}
                >
                  <SettingsIcon ref={AnimateRef} />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup onClick={() => navigate("/user/profile")}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black">
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="w-full focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black"
                    asChild
                  >
                    <button
                      onClick={() => {
                        signOutHandler();
                      }}
                    >
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroup>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
