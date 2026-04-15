import {
  card1,
  card2,
  card3,
  card4,
  card5,
  card6,
  card7,
  type CardDTO,
} from "@/lib/constants/content/SampleCardData";
import { ContentCard } from "./ContentCard";
import { motion } from "framer-motion";
import { useState } from "react";
import { LongContentCard } from "./LongContentCard";

export default function DashboardComp() {
  /* dashboard bookmarks cards grid */
  const [selectedCard, setSelectedCard] = useState<null | CardDTO>(null);
  const cards = [card1, card2, card3, card4, card5, card6, card7];

  return (
    <div className="my-2 flex flex-col gap-10">
      <div className="my-4 grid grid-cols-2 gap-8 lg:grid-cols-3">
        {cards.map((cardData, idx) => {
          return (
            <motion.div layoutId={cardData.contentTitle}>
              <ContentCard
                key={idx}
                cardData={cardData}
                setSelectedCard={setSelectedCard}
              />
            </motion.div>
          );
        })}

        {/* render the card data on full screen */}
        {selectedCard && (
          <LongContentCard
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        )}
      </div>
    </div>
  );
}
