import { cn } from "@repo/libs";
import CardOutline from "./CardOutlineForStepsCard";
import { colors } from "@/lib/constants/colors";
import type { StepsArrayDTO } from "@/lib/constants/content/docs";

interface StepsCardDTO {
  idx: number;
  data: StepsArrayDTO;
}

export function StepsCard({ idx, data }: StepsCardDTO) {
  return (
    <CardOutline key={idx}>
      <h2
        className={cn(
          colors[idx % colors.length].light,
          colors[idx % colors.length].dark,
          "bg-transparent font-medium dark:bg-transparent",
        )}
      >
        {data.title}
      </h2>
      <p>{data.description}</p>
    </CardOutline>
  );
}
