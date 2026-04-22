import { BrowserIcon } from "@repo/icons";
import { XIcon } from "@repo/icons";
import { DeleteIcon } from "@repo/icons";
import { EditIcon } from "@repo/icons";
import { ShareIcon } from "@repo/icons";
import { ShareOffIcon } from "@repo/icons";
import Tags from "@/lib/utils/Tags";
import { LinkIcon } from "lucide-react";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import type { dashboardFetchDataType } from "@/Types/dashboard";
import { toast } from "@repo/ui";
import { MapCategoryWithIcon } from "@/lib/utils/mapCategoryIcon";

export function LongContentCard({
  selectedCard,
  setSelectedCard,
}: {
  selectedCard: dashboardFetchDataType;
  setSelectedCard: Dispatch<SetStateAction<dashboardFetchDataType | null>>;
}) {
  /* effect to toggle the scroll of main page on card open and close */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const Icon = MapCategoryWithIcon(selectedCard.contentTable.category);
  return (
    <div className="fixed inset-0 z-10 flex max-h-screen items-center justify-center bg-black/30 backdrop-blur-xs">
      <div className="relative flex h-fit max-h-[90vh] min-h-50 max-w-200 min-w-90 flex-col rounded-xl border bg-zinc-100 p-10 text-start text-xs shadow-sm shadow-zinc-900 dark:border-4 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
        <span className="absolute -top-2 -right-2 z-20 rounded-full border-2 bg-zinc-300 p-0.5">
          {
            <XIcon
              onClick={() => {
                setSelectedCard(null);
              }}
              className="text-zinc-900"
              size={18}
            />
          }
        </span>

        {/* to gap bw the entire data and the date part  */}
        <div className="space-y-4 overflow-y-auto">
          {/*  header+content of card */}
          <div className="space-y-6">
            {/* for the header of card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon
                  size={16}
                  className="rounded-sm border-2 border-black/50 p-1 dark:border-white/50"
                />
                <h5 className="text-sm">
                  {selectedCard.contentTable.category}
                </h5>
              </div>
              {selectedCard.ContentShareLinkTable?.contentSharehash ? (
                <div className="flex items-center gap-1 text-sm">
                  <>
                    <LinkIcon size={16} />
                    <span className="text-sm">Shared</span>
                  </>
                </div>
              ) : null}
            </div>

            {/* Card content the title and description */}
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-sm font-semibold wrap-break-word">
                  Title: {selectedCard.contentTable.title}
                </div>
              </div>
              <div className="space-y-5">
                {selectedCard.contentTable.description ? (
                  <div>
                    <div className="text-sm font-thin wrap-break-word text-gray-600/90 dark:text-zinc-400/70">
                      Description: {selectedCard.contentTable.description}
                    </div>
                  </div>
                ) : null}

                {selectedCard.contentTable.tags ? (
                  <div>
                    <div className="max-w-sm text-sm">
                      <Tags
                        tags={selectedCard.contentTable.tags}
                        sliceCount={100}
                      />{" "}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* last section the date and the 4 updations buttons */}
          <div className={"flex w-full items-center justify-between text-sm"}>
            {/* need to change to date */}
            <div>Date: </div>
            <div className="flex gap-3">
              {[
                {
                  Icon: EditIcon,
                  className: "text-black dark:text-white",
                  action: () => {
                    toast("open edit page");
                  },
                },
                {
                  Icon: selectedCard.contentTable.link
                    ? ShareIcon
                    : ShareOffIcon,
                  className: "text-black dark:text-white",
                  action: () => {
                    toast("toggle share ");
                  },
                },
                {
                  Icon: DeleteIcon,
                  className: "text-red-500",
                  action: () => {
                    toast("delete content");
                  },
                },
                /* now add BrowserIcon only if link available */
                ...(selectedCard.contentTable.link
                  ? [
                      {
                        Icon: BrowserIcon,
                        className: "text-lime-600 ",
                        action: () => {
                          toast("open link");
                        },
                      },
                    ]
                  : []),
              ].map((x, idx) => (
                <div key={idx} onClick={() => x.action()}>
                  <x.Icon className={x.className} size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
