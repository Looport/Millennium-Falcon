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
      <header className="px-[3.5rem]">
        <HomeCard.Title className="
          bg-gradient-to-r from-[#FFE853] to-[#FF343F]
          ">
          Around The Globe, Just Pick Where
        </HomeCard.Title>
      <HomeCard.Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut
        dolor elit. In ornare posuere.
      </HomeCard.Text>
      </header>
      <div className="absolute bottom-[2rem] flex gap-[2rem]">
        <span className="
          w-[1rem] h-[1rem] 
          rounded-full bg-zinc-50
          " />
        <span className="
          w-[1rem] h-[1rem] 
          rounded-full border border-zinc-50/60
          " />
        <span className="
          w-[1rem] h-[1rem] 
          rounded-full border 
          border-zinc-50/60
          " />
      </div>
    </div>
  </HomeCard>
);
