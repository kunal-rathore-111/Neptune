import { useRef, useState } from "react";
import { animateIconUsingRef, type IconHandle } from "@repo/ui";
import { SettingsIcon } from "@repo/icons";
import { useNavigate } from "react-router";

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
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui";
import { useSignOut } from "@/hooks/react-query-hooks/useSignOut";
import { useFetchUserProfile } from "@/hooks/react-query-hooks/useUserProfile";

type propsType = {
  isSharedDashboard?: boolean
}

export function SideBarFooterComp(props: propsType) {
  const { data } = useFetchUserProfile();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const AnimateRef = useRef<IconHandle>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const { mutate: signOutMutation } = useSignOut();
  async function signOutHandler() {
    signOutMutation();
  }

  const avatarEl = (
    <Avatar className="transition-all duration-200 hover:scale-110 h-6 w-6 shrink-0">
      <AvatarImage
        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar/avatar8.jpg"
        alt="userProfileImage"
      />
      <AvatarFallback>{""}</AvatarFallback>
    </Avatar>
  );

  return (
    <SidebarFooter className="p-2 group-data-[state=collapsed]:p-1">
      <SidebarMenu>
        <SidebarMenuItem className="flex flex-col items-center justify-center gap-2 rounded-none border-y">
          {isCollapsed ? (
            /* Collapsed State: Single Avatar button that triggers Dropdown Menu directly */
            <div className="py-2 flex items-center justify-center w-full">
              <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton 
                    className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                    tooltip="Profile & Settings"
                  >
                    {avatarEl}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="end" className="w-48 ml-2">
                  <DropdownMenuLabel>
                    {data?.type === "success" ? data.userProfileData.username : "Account"}
                  </DropdownMenuLabel>
                  <DropdownMenuGroup onClick={() => navigate("/user/profile")}>
                    <DropdownMenuItem className="focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black">
                      Profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {!props.isSharedDashboard && (
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="w-full focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black"
                        asChild
                      >
                        <button onClick={signOutHandler}>Logout</button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            /* Expanded State: Normal row layout */
            <SidebarGroup className="flex-row gap-5 px-1 py-2 w-full justify-between items-center">
              <SidebarMenuButton className="text-xs flex items-center gap-2 flex-1">
                {avatarEl}
                <span className="truncate">
                  {data?.type === "success" ? data.userProfileData.username : "username"}
                </span>
              </SidebarMenuButton>

              {!props.isSharedDashboard && (
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
                        <button onClick={signOutHandler}>Logout</button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SidebarGroup>
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
