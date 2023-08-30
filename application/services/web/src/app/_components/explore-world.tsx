import Image from "next/image";
import { IconContext } from "react-icons";
import { BiMapAlt } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { TbUsersPlus } from "react-icons/tb";
import { HomeCard } from "./home-card";

export const ExploreWorld = () => (
  <HomeCard className="
    h-full
    p-[0!important]
    ">
    <header className="p-[20px] pb-[0]">
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
    <div
      className="
      relative

      before:absolute before:top-[20px] before:right-[-35px]
      before:content-[' '] before:w-[80px] before:h-[80px]
      before:bg-[url('/Elips-Orange.png')] before:bg-no-repeat
      before:bg-[length:cover] before:rounded-[25px]
      before:z-[-1]

      after:absolute after:bottom-[30px] after:left-[-30px]
      after:content-[' '] after:w-[90px] after:h-[90px]
      after:bg-[url('/Elips-Orange.png')] after:bg-no-repeat
      after:bg-[length:cover] after:rounded-[25px]
      after:rotate-[70deg]
      "
    >
      <Image
        className="
        object-cover
        w-full 
        h-[296px]
        "
        width={530}
        height={296}
        src="/Explore-Map.png"
        alt="Explore Map"
      />
    </div>
    <div className="
      p-[20px]
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
