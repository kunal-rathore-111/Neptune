import Person1 from "@/assets/images/avatar/landing/person1.png";
import Person2 from "@/assets/images/avatar/landing/person2.png";
import Person3 from "@/assets/images/avatar/landing/person3.png";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@repo/ui/avatar/avatar";

export function AvatarGroupComp() {
  const AvatarDataArray = [
    { src: Person1, alt: "Member 1", initials: "M1" },
    { src: Person2, alt: "Member 2", initials: "M2" },
    { src: Person3, alt: "Member 3", initials: "M3" },
  ];
  return (
    <AvatarGroup>
      {AvatarDataArray.map((x, idx) => {
        return (
          <Avatar
            className="transition-all duration-600 hover:z-10 hover:scale-110"
            key={idx}
          >
            <AvatarImage src={x.src} alt={x.alt} />
            <AvatarFallback>{x.initials}</AvatarFallback>
          </Avatar>
        );
      })}
    </AvatarGroup>
  );
}
