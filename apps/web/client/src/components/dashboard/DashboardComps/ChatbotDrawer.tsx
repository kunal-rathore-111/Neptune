import { useChatbot } from "@/hooks/react-query-hooks/useChatbot";
import { ChatBotIcon, LoaderIcon, SendIcon } from "@repo/icons";
import { cn } from "@repo/libs";
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
  type IconHandle,
} from "@repo/ui";
import { X, User } from "lucide-react";
import { useRef, useState, useEffect, type FormEvent } from "react";

export function ChatBotDrawerComp() {
  const animateRef = useRef<IconHandle>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");

  const [chatHistory, setChatHistory] = useState<
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
  }, [chatHistory]);

  function handleChatBot(e: FormEvent) {
    e.preventDefault();
    console.error("Before- ", chatHistory.length);

    setChatHistory((prev) => [...prev, { role: "user", content: message }]);

    console.error("AFter- ", chatHistory.length);
    chatBotMutate(message, {
      onSuccess: (response) => {
        setChatHistory((prev) => [
          ...prev,
          { role: "bot", content: response.response },
        ]);
        setMessage(""); // now clear the current input
      },
    });
    console.error("- ", chatHistory.length);
  }

  return (
    <div className="absolute right-10 bottom-10 transition-all duration-300 hover:scale-110">
      <Drawer direction="right">
        <DrawerTrigger asChild {...animateIconUsingRef(animateRef)}>
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
              className="rounded-xl border-2 p-1 dark:border-white"
            >
              <X size={29} />
            </DrawerClose>
          </DrawerHeader>
          <div
            ref={scrollRef}
            className="no-scrollbar mx-4 flex-1 overflow-y-auto rounded-sm border-2 px-2 py-1 dark:border-white"
          >
            {chatHistory.map((chat) => {
              return (
                <p className="style-lyra:mb-2 style-lyra:leading-relaxed mb-4 leading-normal">
                  <RenderChatComp chat={chat} />
                </p>
              );
            })}
          </div>
          <DrawerFooter>
            <fieldset disabled={isPending}>
              <InputGroup className="gap-2 border-2 dark:border-white">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter message"
                  className="resize-none"
                />

                <div className="flex items-center px-2">
                  {isPending ? (
                    <LoaderIcon size={19} />
                  ) : (
                    <button onClick={(e) => handleChatBot(e)}>
                      <SendIcon size={15} />
                    </button>
                  )}
                </div>
              </InputGroup>
            </fieldset>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
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
              <User size={16} className="text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Message Content Section */}
        <div className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}>
          <span className="text-muted-foreground/70 mb-1 px-1 text-[10px] font-bold tracking-widest uppercase">
            {isBot ? "Neptune AI" : "You"}
          </span>

          <div
            className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed font-medium shadow-sm ${
              isBot
                ? "bg-muted/50 text-foreground border-border/50 rounded-tl-none border"
                : "bg-primary text-primary-foreground rounded-tr-none shadow-md"
            } `}
          >
            {chat.content}
          </div>
        </div>
      </div>
    </div>
  );
}
