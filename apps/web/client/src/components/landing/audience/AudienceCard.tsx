import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { CardBody, CardContainer, CardItem } from "@repo/ui";
import { type AudienceCommentArrayDTO } from "@/lib/constants/content/audience";

interface AudienceCardDTO {
  data: AudienceCommentArrayDTO;
  idx: number;
}

export function AudienceCard({ data, idx }: AudienceCardDTO) {
  return (
    <CardContainer className="inter-var" key={idx}>
      <CardBody className="relative flex h-auto w-auto rounded-xl bg-zinc-100 p-6 text-start shadow-sm shadow-zinc-900 sm:w-65 dark:bg-zinc-950/80 dark:shadow-zinc-300/90">
        <CardItem
          className="flex w-full flex-col gap-2 text-xs"
          translateZ="5"
          translateY={-10}
        >
          <p>"{data.comment}"</p>
          <div className="flex items-center gap-1">
            <Avatar>
              <AvatarImage src={data.image} alt={`@${data.name}`} />
              <AvatarFallback>
                {data.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>@{data.name}</span>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
