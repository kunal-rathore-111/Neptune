import { motion, type Variants } from "framer-motion";
import { colors } from "../constants/colors";
import { cn } from "@repo/libs";

// generating color string based(tag based)
function getColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    // here the below thing converts the string tag in a specific no like "abc"= 382 and "cba" = 234 (different string different no)
    hash = tag.charCodeAt(i) + 19 * hash; // 19*hash (the previous substring weight * 19 (performing *19 in hash to get unique no.))
  }
  return colors[Math.abs(hash) % colors.length];
}

interface TagsDTO {
  tags: string[];
  childVariant?: Variants;
  shouldSlice?: boolean;
}

export default function Tags({
  tags,
  childVariant,
  shouldSlice = true,
}: TagsDTO) {
  const displayTags = shouldSlice ? tags.slice(0, 3) : tags;
  return (
    <div className="flex flex-wrap gap-3">
      {displayTags.map((tag, idx) => {
        const color = getColor(tag);

        return (
          <motion.span
            key={idx}
            variants={childVariant ?? undefined}
            custom={childVariant ? idx : 0}
            className={cn(
              "py mx-2 rounded border px-1 text-[12px]",
              color.light,
              color.dark,
            )}
          >
            #{tag}
          </motion.span>
        );
      })}
    </div>
  );
}
