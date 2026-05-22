
import { animateIconUsingRef, Button, SidebarMenu, SidebarMenuItem, SidebarTrigger, type IconHandle } from "@repo/ui"
import { NeptunePlanetIcon } from "@repo/icons"
import { useNavigate } from "react-router"
import { useRef } from "react";

export function SideBarTitle() {
    const navigate = useNavigate();
    const animateRef = useRef<IconHandle>(null);

    return (
        <SidebarMenu className="py-2 pl-2 group-data-[state=collapsed]:pl-0 group-data-[state=collapsed]:py-3">
            <SidebarMenuItem
                className="flex group-data-[state=collapsed]:flex-col  items-center justify-between group-data-[state=collapsed]:items-center group-data-[state=collapsed]:gap-1"
            >
                <Button
                    {...animateIconUsingRef(animateRef)}
                    variant={'link'}
                    className="p-1 h-auto text-black dark:text-white hover:no-underline group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:size-8 group-data-[state=collapsed]:flex group-data-[state=collapsed]:items-center group-data-[state=collapsed]:justify-center
                    items-center"
                    onClick={() => navigate('/')}
                >
                    <div className="flex  items-center">
                        <NeptunePlanetIcon ref={animateRef} className="flex items-center
                          justify-center" />

                        <div className=" flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden ml-2">
                            <span className="truncate font-semibold">Neptune</span>
                        </div>
                    </div>
                </Button>

                <SidebarTrigger
                    variant="link"
                    className="text-zinc-500 hover:text-black dark:hover:text-white group-data-[state=collapsed]:size-8 group-data-[state=collapsed]:flex group-data-[state=collapsed]:items-center group-data-[state=collapsed]:justify-center"
                />
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
