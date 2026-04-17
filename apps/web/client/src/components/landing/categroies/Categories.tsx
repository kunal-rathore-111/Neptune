import { DotComp } from "@repo/ui";
import { Marquee } from "@repo/ui";

export default function Categories() {
  const words = [
    "Others",
    "Development",
    "Finance",
    "Study",
    "Social",
    "GitHub",
    "Exams",
    "AI",
    "Research",
    "Design",
  ];
  return (
    <div className="flex items-center border-y text-black/70 dark:text-white/60">
      <span className="flex h-full items-center gap-2 p-1">
        <DotComp />
        <div className="text-4xl font-semibold uppercase"> Categories </div>
      </span>
      <Marquee className="flex-1 [mask-image:linear-gradient(to_right,transparent,black_80px,black_calc(100%-80px),transparent)]">
        {words.map((word, idx) => (
          <span
            key={idx}
            style={{ marginRight: 8 }}
            className="flex items-center gap-1"
          >
            <DotComp />
            {word}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
