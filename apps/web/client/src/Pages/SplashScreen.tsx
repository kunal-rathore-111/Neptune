import { NeptunePlanetIcon } from "@repo/icons";
import type { IconHandle } from "@repo/ui";
import { useEffect, useRef } from "react";

export function SplashScreenPage() {
    const animateIcon = useRef<IconHandle>(null);
    useEffect(() => {
        if (animateIcon) animateIcon.current?.startAnimation();

    }, [])
    return <main className="fixed inset-0 dark:bg-black bg-zinc-300 flex items-center justify-center z-50 gap-1 ">
        <span className="flex gap-1 items-center justify-center text-2xl">
            <NeptunePlanetIcon size={34} ref={animateIcon} /> Neptune
        </span>
    </main>
}