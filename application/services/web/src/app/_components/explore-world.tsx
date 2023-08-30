import Image from "next/image";
import { IconContext } from "react-icons";
import { BiMapAlt } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { TbUsersPlus } from "react-icons/tb";
import { HomeCard } from "./home-card";

export const ExploreWorld = () => (
  <HomeCard className="
    h-full
    ">
    <header className="mb-[20px]">
      <div className="mb-[35px]">
        <HomeCard.Tooltip
          text={"Try New Feture"}
          icon={
            <div className="bg-red-600 rounded-[100px] p-[7px]">
              <BsStars />
            </div>
          }
        />
      </div>
      <div className="mx-[35px] text-center">
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
        className="object-cover w-full h-[296px]"
        width={530}
        height={296}
        src="/Explore-Map.png"
        alt="Explore Map"
      />
    </div>
    <div className="
      mt-[20px]
      flex flex-col gap-[5px] justify-center items-center
      ">
      <a
        className="
        font-bold
        flex gap-[13px] items-center
        py-[13px] px-[30px] rounded-[50px] 
        border border-slate-50/25 bg-blue-500
        "
        href="/world"
      >
        <IconContext.Provider value={{ size: "24px" }}>
          <BiMapAlt />
        </IconContext.Provider>
        <span>Explore The World</span>
      </a>
      <span>or</span>
      <button className="
        flex gap-[13px] items-center
        font-bold underline decoration-solid
        ">
        <IconContext.Provider value={{ size: "24px" }}>
          <TbUsersPlus />
        </IconContext.Provider>
        <span>Bring Friends With You</span>
      </button>
    </div>
  </HomeCard>
);
