import { useChatbot } from "@/hooks/react-query-hooks/useChatbot";
import ReactMarkdown from "react-markdown";

import { ChatBotIcon, LoaderIcon, SendIcon, UserIcon } from "@repo/icons";
import {
  animateIconUsingRef,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  InputGroup,
  Textarea,
  toast,
  type IconHandle,
} from "@repo/ui";
import { X } from "lucide-react";
import { useRef, useState, useEffect, type FormEvent } from "react";

export function ChatBotDrawerComp() {
  const animateRef = useRef<IconHandle>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [isNewChat, setIsNewChat] = useState<boolean>(true);

  const options = [
    "Deep search in my bookmarks for the content ",
    "What are the main categories of things I've saved?",
    "Summarize my most recent bookmarks",
    "Find links related to my coding projects",
    "Suggest a reading path based on my library",
  ];



  const [chat, setChat] = useState<
    { role: "user" | "bot"; content: string }[]
  >([{ role: "bot", content: "Hi, I'm Neputne ai. How can I assist you?" }]);

  const { isPending, mutate: chatBotMutate } = useChatbot();

  // whenever the history changes scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat]);

  function handleChatBot(e: FormEvent) {
    e.preventDefault();

    // need to add queryzod
    if (!message) {
      toast.error("Message is empty!!", { position: "top-right" });
      return;
    }
    setChat((prev) => [...prev, { role: "user", content: message }]);

    // console.error("AFter- ", chat);

    const props = { userQuery: message, chatHistory: chat.slice(-3) }
    chatBotMutate(props, {
      onSuccess: (response) => {
        setChat((prev) => [
          ...prev,
          { role: "bot", content: response.response },
        ]);
        setMessage(""); // now clear the current input
      },
    });
    //  console.error("- ", chat.length);
  }

  useEffect(() => {
    if (chat.length > 1 && isNewChat) setIsNewChat(false);
  }, [chat])



  return (
    <div className="fixed right-10 bottom-10 z-50 ">
      <Drawer direction="right" >
        <DrawerTrigger
          className="bg-zinc-900 dark:bg-zinc-300 p-3 rounded-full text-white dark:text-black"
          asChild {...animateIconUsingRef(animateRef)}>
          {/* icon to open chat drawer */}
          <ChatBotIcon ref={animateRef} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="m-4 flex flex-row justify-between rounded border-2 p-2 dark:border-white">
            <div className="flex items-center space-x-2">
              <ChatBotIcon className="inline-block" />
              <DrawerTitle>Neputne AI</DrawerTitle>
            </div>
            <DrawerClose
              asChild
              className="rounded-xl border-2 p-1 hover:scale-110 transition duration-400 dark:border-white"
            >
              <X size={29} />
            </DrawerClose>
          </DrawerHeader>
          <div
            ref={scrollRef}
            className="no-scrollbar select-text relative  mx-4 flex-1 overflow-y-auto rounded-sm border-2 px-2 py-1 dark:border-white"
          >
            {chat.map((chat, index) => {
              return (
                <div key={index} className="mb-4">
                  <RenderChatComp chat={chat} />
                </div>
              );
            })}

            {/* options/ideas for new chat */}
            {isNewChat &&
              <div className="absolute bottom-2">
                Suggested Queries
                <div className="flex flex-wrap gap-1">
                  {options.map(option => <span key={option} onClick={() => setMessage(option)} className="text-xs  cursor-pointer border-2 shadow-xs shadow-black p-1 rounded">{option} </span>)}
                </div>
              </div>}
          </div>
          <DrawerFooter>
            <fieldset disabled={isPending}>
              <InputGroup className="gap-2 border-2 items-start dark:border-white">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter message"
                  className="resize-none"
                  onKeyDown={(e) => { if (e.key === "Enter") handleChatBot(e) }}
                />

                <div className=" px-3 py-5">
                  {isPending ? (
                    <LoaderIcon size={19} />
                  ) : (
                    <button onClick={(e) => handleChatBot(e)}
                    >
                      <SendIcon size={15} />
                    </button>
                  )}
                </div>
              </InputGroup>
            </fieldset>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div >
  );
}

type RenderChatCompType = {
  role: "user" | "bot";
  content: string;
};

function RenderChatComp({ chat }: { chat: RenderChatCompType }) {
  const isBot = chat.role === "bot";

  return (
    <div
      className={`flex w-full ${isBot ? "justify-start" : "justify-end"} mb-4`}
    >
      <div
        className={`flex max-w-[85%] ${isBot ? "flex-row" : "flex-row-reverse"} gap-1.5`}
      >
        <div className="shrink-0 pt-1">
          {isBot ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 shadow-sm">
              <ChatBotIcon size={20} className="text-blue-500" />
            </div>
          ) : (
            <div className="bg-secondary border-border flex h-8 w-8 items-center justify-center rounded-full border shadow-sm">
              <UserIcon size={16} className="text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Message Content Section */}
        <div className={`flex flex-col flex-1 min-w-0 ${isBot ? "items-start" : "items-end"}`}>
          <span className="text-muted-foreground/70 mb-1 px-1 text-[10px] font-bold tracking-widest uppercase ">
            {isBot ? "Neptune AI" : "You"}
          </span>

          <div
            className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed font-medium shadow-sm break-words whitespace-pre-wrap overflow-hidden w-full ${isBot
              ? "bg-muted/50 text-foreground border-border/50 rounded-tl-none border"
              : "bg-primary text-primary-foreground rounded-tr-none shadow-md"
              } `}
          >
            {isBot ? (
              <div className="prose prose-sm dark:prose-invert max-w-none prose-ol:list-decimal prose-ul:list-disc prose-ol:pl-4 prose-ul:pl-4 prose-li:marker:text-foreground/80">
                <ReactMarkdown>{chat.content}</ReactMarkdown>
              </div>
            ) : (
              chat.content
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
