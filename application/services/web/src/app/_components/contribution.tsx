import { IconContext } from "react-icons";
import { AiFillHeart, AiOutlineStar } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";
import { LiaAwardSolid, LiaHandHoldingHeartSolid } from "react-icons/lia";
import { HomeCard } from "./home-card";

export const Contribution = () => (
  <HomeCard className="pb-[40px] h-full">
    <header className="mb-[20px]">
      <div className="mb-[30px]">
        <HomeCard.Tooltip
          text="Featured"
          icon={
            <div className="bg-red-600 rounded-[100px] p-[7px]">
              <AiFillHeart />
            </div>
          }
        />
      </div>
      <HomeCard.Title className="
        bg-gradient-to-r from-[#FFE853] to-[#FF343F]
        ">
        Support Unique Ideas
      </HomeCard.Title>
    </header>
    <div className="mb-[40px]">
      <ul className="font-extrabold flex flex-col gap-[10px] mb-[10px]">
        <li className="
          flex justify-between items-center
          rounded-lg bg-white/5 px-[15px] py-[8px]
          ">
          <div className="flex items-center gap-[6px]">
            <span>
              <IconContext.Provider value={{ color: "#FFE753", size: "20px" }}>
                <LiaAwardSolid />
              </IconContext.Provider>
            </span>
            Add More Profile Settings
          </div>
          <span>
            <IconContext.Provider value={{ size: "20px" }}>
              <FiThumbsUp />
            </IconContext.Provider>
          </span>
        </li>
        <li className="
          flex justify-between items-center
          rounded-lg bg-white/5 px-[15px] py-[8px]
          ">
          <div className="flex items-center gap-[6px]">
            <span>
              <IconContext.Provider value={{ color: "#A4A4A7", size: "20px" }}>
                <LiaAwardSolid />
              </IconContext.Provider>
            </span>
            Add Dark Theme and More Accessibility
          </div>
          <span>
            <IconContext.Provider value={{ size: "20px" }}>
              <FiThumbsUp />
            </IconContext.Provider>
          </span>
        </li>
        <li className="
          flex justify-between items-center
          rounded-lg bg-white/5 px-[15px] py-[8px]
          ">
          <div className="flex items-center gap-[6px]">
            <span>
              <IconContext.Provider value={{ color: "#FF7B47", size: "20px" }}>
                <LiaAwardSolid />
              </IconContext.Provider>
            </span>
            Add Animated Emojis in Chat
          </div>
          <span>
            <IconContext.Provider value={{ size: "20px" }}>
              <FiThumbsUp />
            </IconContext.Provider>
          </span>
        </li>
      </ul>
      <div className="text-right">
        <span className="underline">See all features</span>
      </div>
    </div>
    <div className="mb-[40px]">
      <div className="mb-[20px]">
        <div className="
          h-[3px] rounded-xl
          bg-gradient-to-r 
          from-indigo-500 from-0% 
          via-pink-500 via-20% 
          via-rose-600 via-50% 
          via-white via-60%
          to-white to-100%
          ">
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-extrabold">$500k+</span>
          <span>Raised</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold">20k+</span>
          <span>Sponsors</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold">50+</span>
          <span>Inspiration</span>
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold">$100+</span>
          <span>Goal</span>
        </div>
      </div>
    </div>
    <div className="flex justify-center gap-[20px]">
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
          <AiOutlineStar />
        </IconContext.Provider>
        <span>Suggest Feature</span>
      </a>
      <button className="
          font-bold
          flex gap-[13px] items-center
          py-[13px] px-[30px] rounded-[50px] 
          border border-slate-50/25
          ">
        <IconContext.Provider value={{ size: "24px" }}>
          <LiaHandHoldingHeartSolid />
        </IconContext.Provider>
        <span>Support Ideas</span>
      </button>
    </div>
  </HomeCard>
);
