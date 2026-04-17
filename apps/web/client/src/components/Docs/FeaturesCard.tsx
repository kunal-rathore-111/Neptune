import { colors } from "@/lib/constants/colors";
import { type FeaturesArrayDTO } from "@/lib/constants/content/docs";
import { cn } from "@repo/libs";

interface FeaturesCardDTO {
  data: FeaturesArrayDTO;
  idx: number;
}

export function FeaturesCard({ data, idx }: FeaturesCardDTO) {
  return (
    <div
      key={idx}
      className="flex h-auto w-full flex-col rounded-xl bg-zinc-100 p-6 px-5 py-3 text-start text-sm shadow-lg shadow-zinc-900/20 dark:bg-zinc-950/80 dark:shadow-zinc-800/50"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              colors[idx % colors.length].light,
              colors[idx % colors.length].dark,
              "rounded border p-1",
            )}
          >
            <data.icon size={14} />
          </span>
          <h2
            className={cn(
              colors[idx % colors.length].light,
              colors[idx % colors.length].dark,
              "bg-transparent font-medium dark:bg-transparent",
            )}
          >
            {data.title}
          </h2>
        </div>
        <p>{data.description}</p>
      </div>
    </div>
  );
}
