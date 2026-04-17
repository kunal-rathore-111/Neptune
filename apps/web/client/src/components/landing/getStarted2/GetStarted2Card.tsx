import { Button } from "@repo/ui";
import { CardBody, CardContainer, CardItem } from "@repo/ui";
import { GlareHover } from "@repo/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function GetStarted2Card() {
  const navigate = useNavigate();

  const [dimensions, setDimensions] = useState({
    width: "300px",
    height: "150px",
  });

  /* to give card height and width on the basis of real time width */
  useEffect(() => {
    const w = window.innerWidth;
    if (w < 768) //mobile
    {
      setDimensions({ width: "300px", height: "150px" });
    } else if (w < 1024) {
      setDimensions({ width: "480px", height: "260px" });
    } else {
      setDimensions({ width: "600px", height: "290px" });
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
      <CardContainer className="inter-var rounded-4xl border-2 dark:border-zinc-400">
        <GlareHover
          className="z-0 flex items-center justify-center"
          background="transparent"
          borderColor="transparent"
          height={dimensions.height}
          width={dimensions.width}
        >
          <CardBody className="flex h-auto w-auto bg-zinc-500/20 px-20 py-12">
            <CardItem
              className="flex w-full flex-col items-center gap-4 text-xs"
              translateX={7}
              translateY={-7}
            >
              <div className="w-fit font-sans text-4xl font-bold whitespace-nowrap uppercase">
                <p>Start building your</p>
                <p>second mind today.</p>
              </div>

              <p className="text-black/40 dark:text-zinc-300/40">
                Free forever. No credit card required.
              </p>

              <div className="z-50 flex items-center gap-1">
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    //console.log("Get started clicked");
                    navigate("/signup");
                  }}
                >
                  Get started
                </Button>
                <Button
                  variant={"secondary"}
                  className="bg-black/30 font-light transition-colors duration-400 hover:bg-zinc-300 dark:bg-white/30 dark:hover:bg-zinc-800"
                >
                  View Demo
                </Button>
              </div>
            </CardItem>
          </CardBody>
        </GlareHover>
      </CardContainer>
    </div>
  );
}
