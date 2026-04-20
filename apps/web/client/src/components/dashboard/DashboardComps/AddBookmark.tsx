import { Link } from "lucide-react";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import { LinkIcon } from "@repo/icons";
import { KeyboardIcon } from "@repo/icons";
import { XIcon } from "@repo/icons";
import { Field, FieldGroup, FieldLabel } from "@repo/ui";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@repo/ui";
import { Textarea } from "@repo/ui";
import { Checkbox } from "@repo/ui";
import { TagsInputComp } from "@repo/ui";

interface AddBookMarkCardDTO {
  setOpenAddCard: Dispatch<SetStateAction<boolean>>;
}

export default function AddBookMarkCard({
  setOpenAddCard,
}: AddBookMarkCardDTO) {
  /*  useffect to stop background scroll the body (same code was also in the longCardComp) */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });
  return (
    <>
      <div className="fixed inset-0 z-10 flex max-h-screen items-center justify-center bg-black/30 backdrop-blur-xs">
        <div className="relative flex h-full max-h-[90vh] w-150 flex-col rounded-xl border bg-zinc-100 p-7 text-start text-xs shadow-sm shadow-zinc-900 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
          <span className="absolute -top-2 -right-2 z-20 rounded-full border bg-zinc-300 p-0.5">
            {
              <XIcon
                onClick={() => {
                  setOpenAddCard(false);
                }}
                className="text-zinc-500"
                size={20}
              />
            }
          </span>

          <div className="overflow-y-auto px-10">
            <form className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link
                    size={26}
                    className="rounded-sm border-2 border-black/50 p-1 dark:border-white/50"
                  />
                  <h5 className="text-sm">Add Bookmark</h5>
                </div>
              </div>

              {/* Input bars section */}
              <InputSection />
              {/* Submit Button */}
              <button
                type="submit"
                className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 mt-2 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function InputSection() {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [tricks, setTricks] = useState<string[]>([]);
  const [isShareable, setIsShareable] = useState<boolean>(false);

  return (
    <FieldGroup className="max-w-sm gap-5">
      <Field className="gap-1">
        <FieldLabel htmlFor="block-start-input ">URL</FieldLabel>
        <InputGroup className="rounded-md border-2 focus:border-2 has-[[data-slot=input-group-control]:focus-visible]:border-yellow-600 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupInput
            placeholder="https://example.com "
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <InputGroupAddon>
            <LinkIcon size={18} />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <Field className="gap-1">
        <FieldLabel htmlFor="block-start-input ">Title</FieldLabel>
        <InputGroup className="rounded-md border-2 has-[[data-slot=input-group-control]:focus-visible]:border-yellow-600 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <InputGroupInput
            placeholder="Title of content"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputGroupAddon>
            <KeyboardIcon size={18} />
          </InputGroupAddon>
        </InputGroup>
      </Field>

      <Field className="gap-1">
        <FieldLabel htmlFor="block-start-input ">Description</FieldLabel>
        <InputGroup className="rounded-md border-2 focus:border-2 has-[[data-slot=input-group-control]:focus-visible]:border-yellow-600 has-[[data-slot=input-group-control]:focus-visible]:ring-0">
          <Textarea
            id="message"
            value={description}
            placeholder="Optional notes..."
            onChange={(e) => setDescription(e.target.value)}
          ></Textarea>
        </InputGroup>
      </Field>
      <Field className="gap-1">
        <FieldLabel htmlFor="block-start-input ">Tags</FieldLabel>
        <TagsInputComp tricks={tricks} setTricks={setTricks} />
      </Field>

      <div className="flex items-center gap-3 py-2">
        Make shareable
        <Checkbox
          onClick={() => {
            setIsShareable(!isShareable);
          }}
          className="inline-block border-black transition-all duration-200 ease-in dark:border-white"
        />
      </div>
    </FieldGroup>
  );
}
