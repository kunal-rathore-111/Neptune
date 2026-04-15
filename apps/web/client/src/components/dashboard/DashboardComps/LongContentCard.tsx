import { BrowserIcon } from "@repo/icons/Brower";
import { XIcon } from "@repo/icons/Close";
import { DeleteIcon } from "@repo/icons/Delete";
import { EditIcon } from "@repo/icons/Edit";
import { ShareIcon } from "@repo/icons/Share";
import { ShareOffIcon } from "@repo/icons/Shareoff";
import type { CardDTO } from "@/lib/constants/content/SampleCardData";
import Tags from "@/lib/utils/Tags";
import { LinkIcon } from "lucide-react";
import { useEffect, type Dispatch, type SetStateAction } from "react";

export function LongContentCard({
  selectedCard,
  setSelectedCard,
}: {
  selectedCard: CardDTO;
  setSelectedCard: Dispatch<SetStateAction<CardDTO | null>>;
}) {
  /* effect to toggle the scroll of main page on card open and close */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-10 flex max-h-screen items-center justify-center bg-black/30 backdrop-blur-xs">
      <div className="relative flex h-fit max-h-[90vh] max-w-200 flex-col rounded-xl border bg-zinc-100 p-7 text-start text-xs shadow-sm shadow-zinc-900 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
        <span className="absolute -top-2 -right-2 z-20 rounded-full border bg-zinc-300 p-0.5">
          {
            <XIcon
              onClick={() => {
                setSelectedCard(null);
              }}
              className="text-zinc-500"
              size={20}
            />
          }
        </span>

        {/* to gap bw the entire data and the date part  */}
        <div className="space-y-10 overflow-y-auto px-10">
          {/*  header+content of card */}
          <div className="space-y-6">
            {/* for the header of card */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <selectedCard.categoryIcon
                  size={16}
                  className="rounded-sm border-2 border-black/50 p-1 dark:border-white/50"
                />
                <h5 className="text-sm">{selectedCard.category}</h5>
              </div>
              <div className="flex items-center gap-1 text-sm">
                {selectedCard.isShared ? (
                  <>
                    <LinkIcon size={16} />
                    <span className="text-sm">Shared</span>
                  </>
                ) : null}
              </div>
            </div>

            {/* Card content the title and description */}
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-sm font-semibold">
                  {selectedCard.contentTitle}
                </div>
              </div>
              <div className="space-y-5">
                <div>
                  <div className="text-sm font-thin text-gray-600/90 dark:text-zinc-400/70">
                    {selectedCard.contentDescription}
                  </div>
                </div>
                <div>
                  <div className="max-w-sm text-sm">
                    <Tags tags={selectedCard.tags} shouldSlice={false} />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* last section the date and the 4 updations buttons */}
          <div className={"flex w-full items-center justify-between text-sm"}>
            <div>{selectedCard.date}</div>
            <div className="flex gap-3">
              {[
                EditIcon,
                selectedCard.isShared ? ShareIcon : ShareOffIcon,
                DeleteIcon,
                BrowserIcon,
              ].map((Icon, idx) => (
                <div key={idx}>
                  <Icon size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
