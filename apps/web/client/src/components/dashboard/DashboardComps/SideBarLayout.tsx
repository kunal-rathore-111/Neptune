import { BookTextIcon } from "@repo/icons";
import { ThemeToggleButton } from "@repo/ui";
import { PlusIcon } from "@repo/icons";
import { useEffect, useRef, useState } from "react";
import {
  animateIconUsingRef,
  type IconHandle,
} from "@/lib/utils/IconAnimateRef";
import { Button } from "@repo/ui";
import { ChevronRightIcon } from "lucide-react";
import {
  SideBarMenuData,
  type SideBarMenuDataTypes,
} from "@/lib/constants/content/DashboardSample";
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
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui";

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
  return (
    <SidebarHeader>
      <div className="flex flex-col gap-7 p-3">
        <div className="flex w-full items-center justify-between">
          <button
            className="flex cursor-pointer items-center justify-center md:gap-1 lg:gap-2"
            onClick={() => {
              navigate("/");
            }}
          >
            <BookTextIcon size={18} className="inline-block" /> 2nd Mind
          </button>
          <ThemeToggleButton />
        </div>
        <Button
          className="border-2 border-zinc-500/40 bg-transparent text-xs text-zinc-600 shadow-lg shadow-black/10 hover:bg-zinc-200 hover:text-black dark:text-zinc-400 dark:shadow-white/5 hover:dark:bg-zinc-800 dark:hover:text-white"
          asChild
          {...animateIconUsingRef(AnimateRef)}
        >
          <div className="flex gap-1">
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
        <SidebarGroupLabel>Library</SidebarGroupLabel>
        <SidebarGroupContent>
          <SideBar_Menu />
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

function SideBar_Menu() {
  return (
    <SidebarMenu className="">
      {SideBarMenuData.map((menuData) => {
        return menuData.CollapsedData ? (
          <CollapseComp
            key={menuData.SidebarMenuButtonName}
            menuData={menuData}
          />
        ) : (
          <SidebarMenuItem key={menuData.SidebarMenuButtonName}>
            <SidebarMenuButton className="text-xs">
              <menuData.SidebarMenuButtonIcon className="!h-3 !w-4" />
              {menuData.SidebarMenuButtonName}
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

function CollapseComp({ menuData }: { menuData: SideBarMenuDataTypes }) {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          {/* re creating the MenuButton to keep things simple (two buttons same work one in the SideBar_Menu and one is this-) */}
          <SidebarMenuButton className="group flex gap-1 text-xs">
            <menuData.SidebarMenuButtonIcon className="h-3! w-4! text-red-400" />{" "}
            {menuData.SidebarMenuButtonName}
            <ChevronRightIcon className="ml-auto h-3! group-data-[state=open]:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col items-start justify-between gap-1 px-9 pl-6">
          {menuData.CollapsedData?.map((x) => {
            return (
              <button
                className="flex w-full gap-1 rounded border border-transparent px-3 py-1 font-sans text-xs text-zinc-500 transition-colors duration-200 hover:border-zinc-600 hover:text-black dark:text-zinc-400 hover:dark:text-white"
                key={x.CollapsedDataButtonName}
              >
                {x.CollapsedDataIcon && (
                  <x.CollapsedDataIcon className="h-3! w-4!" />
                )}{" "}
                {x.CollapsedDataButtonName}
              </button>
            );
          })}
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function Footer() {
  const AnimateRef = useRef<IconHandle>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem className="flex flex-col items-center gap-2 rounded-none border-y">
          {/* UserProfile_Username and settings */}
          <SidebarGroup className="flex-row gap-5 px-1 py-2">
            <SidebarMenuButton className="text-xs">
              <Avatar className="mr-1 inline-block h-6 w-6 transition-all duration-200 hover:scale-110">
                <AvatarImage src={""} alt={""} />
                <AvatarFallback>{""}</AvatarFallback>
              </Avatar>{" "}
              Username
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
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className="focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black">
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black">
                    Logout
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
