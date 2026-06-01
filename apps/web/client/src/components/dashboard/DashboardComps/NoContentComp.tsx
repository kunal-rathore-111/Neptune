import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setAddBookMarkState } from "@/store/uiSlice";
import { Plus, Inbox, Bookmark } from "lucide-react";
import type { RootState } from "@/store";

export function NoContentPresentComp() {
    const dispatch = useDispatch();
    const isSharedProfileRouteHash = useSelector((state: RootState) => state.ui.isSharedProfileRouteHash);
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120 } },
    };

    const ringVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 25,
                repeat: Infinity,
                ease: "linear" as const,
            },
        },
    };

    return (
        <motion.div
            className=" relative flex max-w-lg flex-col items-center py-5 justify-center px-6 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
                {/* Outer dotted spinning ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-300 dark:border-zinc-800"
                    variants={ringVariants}
                    animate="animate"
                />

                {/* Middle pulsing ring */}
                <motion.div
                    className="absolute h-32 w-32 rounded-full border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/40"
                    animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                {/* Inner glassmorphic circle with custom icon */}
                <motion.div
                    className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/60 shadow-lg shadow-zinc-200/50 backdrop-blur-md dark:border-zinc-700/50 dark:bg-[#150F18]/80 dark:shadow-none"
                    animate="animate"
                >
                    <Inbox size={42} className="text-zinc-600 dark:text-zinc-300" />



                    <motion.div
                        className="absolute -top-1 -left-2 rounded-full border border-zinc-200 bg-white p-1 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
                        animate={{
                            y: [0, 4, -4, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Bookmark size={12} />
                    </motion.div>
                </motion.div>
            </div>

            <motion.h2
                className="mb-3 text-2xl font-bold tracking-tight"
                variants={itemVariants}
            >
                <span className=" text-zinc-500 dark:text-zinc-500">
                    Space is{" "}
                </span>
                <span >
                    beautifully empty
                </span>
            </motion.h2>

            <motion.p
                className="mb-8 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-500"
                variants={itemVariants}
            >
                This is where your bookmarks, links, and documents live. Start building your second brain to organize your digital universe.
            </motion.p>

            {/* Call to Action Button */}
            <motion.div variants={itemVariants}>
                {!isSharedProfileRouteHash &&
                    <motion.button
                        onClick={() => dispatch(setAddBookMarkState(true))}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-zinc-800 hover:shadow-xl dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 dark:hover:shadow-zinc-950/20"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >

                        <span className="absolute inset-0 - from-violet-600/20 via-fuchsia-500/20 to-pink-500/20 opacity-0 transition-opacity duration-600 group-hover:opacity-100" />
                        <Plus size={16} className="transition-transform duration-300 group-hover:rotate-90" />
                        Add Bookmark
                    </motion.button>}
            </motion.div>
        </motion.div >
    );
}