import Image from "next/image";
import { IconContext } from "react-icons";
import { BiMapAlt } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { TbUsersPlus } from "react-icons/tb";
import { HomeCard } from "./home-card";
import { Button } from "@/components/button";

export const ExploreWorld = () => (
  <HomeCard className="
      h-full
      p-[0!important]

      relative

      before:absolute before:top-[25rem] before:right-[-3.5rem]
      before:content-[' '] before:w-[8rem] before:h-[8rem]
      before:bg-[url('/Elips-Orange.png')] before:bg-no-repeat
      before:bg-[length:cover] before:rounded-[2.5rem]
      before:z-[-1]

      after:absolute after:bottom-[21rem] after:left-[-3rem]
      after:content-[' '] after:w-[9rem] after:h-[9rem]
      after:bg-[url('/Elips-Orange.png')] after:bg-no-repeat
      after:bg-[length:cover] after:rounded-[2.5rem]
      after:rotate-[70deg]
    ">
    <header className="p-[2rem] pb-[0]">
      <div className="mb-[3.5rem]">
        <HomeCard.Tooltip
          text={"Try New Feture"}
          icon={
            <div className="bg-red-600 rounded-[10rem] p-[0.7rem]">
              <BsStars />
            </div>
          }
        />
      </div>
      <div className="xl:mx-[3.5rem] mx-[2rem] text-center">
        <HomeCard.Title className="
          bg-gradient-to-r from-[#FF343F] to-[#FFE853]
        ">
          Around The Globe, Just Pick Where
        </HomeCard.Title>
        <HomeCard.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut
          dolor elit. In ornare posuere.
        </HomeCard.Text>
      </div>
    </header>
    <div>
      <Image
        className="
        mx-auto
        object-cover
        "
        width={530}
        height={296}
        src="/Explore-Map.png"
        alt="Explore Map"
      />
    </div>
    <div className="
      p-[2rem]
      mb-[20px]
      mt-[-2.5rem]
      flex flex-col gap-[0.5rem] justify-center items-center
      ">
      <Button
        type="primary"
        icon={<BiMapAlt />}
      >
        Explore The World
      </Button>
      <span>or</span>
      <Button type="link" icon={<TbUsersPlus />}>
Bring Friends With You
      </Button>
    </div>
  </HomeCard>
);
