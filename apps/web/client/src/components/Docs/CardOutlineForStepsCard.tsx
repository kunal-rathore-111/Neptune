import type { ReactNode } from "react";
import { CardBody, CardContainer, CardItem } from "@repo/ui";

type CardOutlineProps = {
  children: ReactNode;
  translate_Z?: number | string;
  translate_Y?: number | string;
  className?: string;
};

export default function CardOutline({
  children,
  translate_Z,
  translate_Y,
  className,
}: CardOutlineProps) {
  return (
    <CardContainer
      className="inter-var w-full justify-start"
      containerClassName="w-full justify-start"
    >
      <CardBody className="relative flex h-auto w-full rounded-xl bg-zinc-100 p-6 text-start shadow-sm shadow-zinc-900 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
        <CardItem
          className={"flex w-full flex-col gap-2 text-xs " + (className ?? "")}
          translateZ={translate_Z ?? "2"}
          translateY={translate_Y ?? "-12"}
        >
          {children}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
