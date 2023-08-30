import { IconContext } from "react-icons";
import { BiMapAlt } from "react-icons/bi";
import { HomeCard } from "./home-card";

export const Roadmap = () => {
  return (
    <HomeCard className="
      relative

      before:absolute before:top-[-30px] before:left-[40px]
      before:content-[' '] before:w-[80px] before:h-[80px]
      before:bg-[url('/Elips-Blue.png')] before:bg-no-repeat
      before:bg-[length:cover] before:rounded-[25px]

      after:absolute after:bottom-[-30px] after:right-[40px]
      after:content-[' '] after:w-[80px] after:h-[80px]
      after:bg-[url('/Elips-Orange.png')] after:bg-no-repeat
      after:bg-[length:cover] after:rounded-[25px]

      ">
      <header className="text-center mb-[20px]">
        <HomeCard.Title className="
          bg-gradient-to-r from-[#FF343F] from-0% via-[#FFE853] via-50% to-[#FF343F] to-100%
          ">
          Roadmap
        </HomeCard.Title>
      </header>

      <div className="
        flex-1
        grid grid-rows-[minmax(0, 1fr), 1px, minmax(0, 1fr)] grid-cols-6
        mb-[20px] items-end gap-[10px] justify-stretch
        ">
        <div className="text-[#354AEB] font-black text-[28px] justify-self-start self-end leading-none">
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
        <div className="text-[#FF222E] font-black text-[28px] justify-self-end leading-none">
          2024
        </div>
        <div className="
          justify-self-stretch
          col-span-6 bg-white h-[2px]
          bg-gradient-to-r 
          from-[#354AEB] from-0% 
          to-[#FF222E] to-100%
          " />
        <div />
        <div className="text-white/80 font-bold text-[20px]">
          Step 1
        </div>
        <div className="text-white/80 font-bold text-[20px]">
          Step 2
        </div>
        <div className="text-white/80 font-bold text-[20px]">
          Step 3
        </div>
        <div className="text-white/80 font-bold text-[20px]">
          Step 4
        </div>
        <div />
      </div>
      <div className="flex justify-center">
        <a
          href="/"
          className="
          font-bold
          flex gap-[13px] items-center
          py-[13px] px-[30px] rounded-[50px] 
          border border-slate-50/25
          "
        >
          <IconContext.Provider value={{ size: "24px" }}>
            <BiMapAlt />
          </IconContext.Provider>
          <span>Learn More</span>
        </a>
      </div>
    </HomeCard>
  );
};
