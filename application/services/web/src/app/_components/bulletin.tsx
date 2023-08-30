"use client";

import Image from "next/image";
import { HomeCard } from "./home-card";

export const Bullerin = () => (
  <HomeCard className="h-full p-[0!important]">
    <div className="
      text-center 
      h-full
      flex flex-col justify-center items-center
      bg-cover bg-center
      bg-gradient-to-b from-blue-800/60 to-red-600/10
      relative
      ">
      <Image
        width={100}
        height={100}
        src="/Bulletin-1.png"
        alt="Image"
        className="z-[-1] absolute w-full h-full object-cover"
      />
      <header>
        <HomeCard.Title className="
          bg-gradient-to-r from-[#FFE853] to-[#FF343F]
          ">
          Around The Globe, Just Pick Where
        </HomeCard.Title>
      </header>
      <HomeCard.Text className="px-[35px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut
        dolor elit. In ornare posuere.
      </HomeCard.Text>
      <div className="absolute bottom-[20px] flex gap-[20px]">
        <span className="
          w-[10px] h-[10px] 
          rounded-full bg-zinc-50
          " />
        <span className="
          w-[10px] h-[10px] 
          rounded-full border border-zinc-50/60
          " />
        <span className="
          w-[10px] h-[10px] 
          rounded-full border 
          border-zinc-50/60
          " />
      </div>
    </div>
  </HomeCard>
);
