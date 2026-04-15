import Person1 from "@/assets/images/avatar/landing/person1.png";
import Person2 from "@/assets/images/avatar/landing/person2.png";
import Person3 from "@/assets/images/avatar/landing/person3.png";

export interface AudienceCommentArrayDTO {
  comment: string;
  image: string;
  name: string;
}

export const AudienceCommentArray: AudienceCommentArrayDTO[] = [
  {
    comment: "Replaced every other bookmark tool I've tried.",
    image: Person1,
    name: "swyx",
  },
  {
    comment: "The search alone is worth it. Incredibly fast.",

    image: Person2,
    name: "t3dotgg",
  },
  {
    comment: "Finally a bookmark manager that feels like real software.",
    image: Person3,
    name: "theo",
  },
  {
    comment: "The tagging flow is super clean and easy to maintain.",
    image: Person1,
    name: "kentcdodds",
  },
  {
    comment: "I can find links in seconds, even from months ago.",
    image: Person2,
    name: "addyosmani",
  },
  {
    comment: "Shared collections made team handoffs way smoother.",
    image: Person3,
    name: "leerob",
  },
  {
    comment: "Feels fast, minimal, and actually pleasant to use daily.",
    image: Person1,
    name: "rauchg",
  },
  {
    comment: "The UI is polished and the core experience just works.",
    image: Person2,
    name: "jasonlengstorf",
  },
  {
    comment: "Exactly what I needed to organize dev resources quickly.",
    image: Person3,
    name: "cassidoo",
  },
];
