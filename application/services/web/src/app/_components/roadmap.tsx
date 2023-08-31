import { IconContext } from "react-icons";
import { BiMapAlt } from "react-icons/bi";
import { HomeCard } from "./home-card";
import { Button } from "@/components/button";

export const Roadmap = () => {
  return (
    <HomeCard className="
      relative

      before:absolute before:top-[-3rem] before:left-[4rem]
      before:content-[' '] before:w-[8rem] before:h-[8rem]
      before:bg-[url('/Elips-Blue.png')] before:bg-no-repeat
      before:bg-[length:cover] before:rounded-[2.5rem]

      after:absolute after:bottom-[-3rem] after:right-[4rem]
      after:content-[' '] after:w-[8rem] after:h-[8rem]
      after:bg-[url('/Elips-Orange.png')] after:bg-no-repeat
      after:bg-[length:cover] after:rounded-[2.5rem]
      ">
      <header className="text-center mb-[2rem]">
        <HomeCard.Title className="
          bg-gradient-to-r from-[#FF343F] from-0% via-[#FFE853] via-50% to-[#FF343F] to-100%
          ">
          Roadmap
        </HomeCard.Title>
      </header>

      <div className="
        flex-1
        grid grid-rows-[minmax(0, 1fr), 1px, minmax(0, 1fr)] grid-cols-6
        mb-[2rem] items-end gap-[1rem] justify-stretch
        ">
        <div className="text-[#354AEB] font-black text-[2.8rem] justify-self-start self-end leading-none">
          2023
        </div>
        <HomeCard.Text>
          Lorem ipsum Dolor sit amet Consectetur adipiscing Roadmap 1
        </HomeCard.Text>
        <HomeCard.Text>
          Dolor sit amet Consectetur adipiscing Roadmap 1
        </HomeCard.Text>
        <HomeCard.Text>
          Consectetur adipiscing Roadmap 1
        </HomeCard.Text>
        <HomeCard.Text>
          Lorem ipsum Dolor sit amet Consectetur adipiscing Roadmap 1
        </HomeCard.Text>
        <div className="text-[#FF222E] font-black text-[2.8rem] justify-self-end leading-none">
          2024
        </div>
        <div className="
          justify-self-stretch
          col-span-6 bg-white h-[0.2rem]
          bg-gradient-to-r 
          from-[#354AEB] from-0% 
          to-[#FF222E] to-100%
          " />
        <div />
        <div className="text-white/80 font-bold text-[2rem]">
          Step 1
        </div>
        <div className="text-white/80 font-bold text-[2rem]">
          Step 2
        </div>
        <div className="text-white/80 font-bold text-[2rem]">
          Step 3
        </div>
        <div className="text-white/80 font-bold text-[2rem]">
          Step 4
        </div>
        <div />
      </div>
      <div className="flex justify-center">
        <Button icon={<BiMapAlt />}>
          Learn More
        </Button>
      </div>
    </HomeCard>
  );
};
