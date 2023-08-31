"use client";

import { Button } from "@/components/button";
import Image from "next/image";
import { IconContext } from "react-icons";
import { AiOutlineGift } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsTelephoneOutbound } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";

export const Header = () => {
  return (
    <header className="
      flex justify-between items-center pt-[4rem]
      font-bold
      ">
      <div className="flex">
        <Image
          width={130}
          height={35}
          src="/logo.png"
          alt="Logo"
        />
        <div className="
          h-[3.5rem] w-[0.2rem] ml-[4rem]
          bg-gray-50/25 
          " />
      </div>
      <nav>
        <ul className="flex gap-[4rem]">
          <li>About Us</li>
          <li>Rouad Map</li>
          <li>Donate</li>
          <li>Register</li>
        </ul>
      </nav>
      <div className="flex gap-[4rem]">
        <IconContext.Provider value={{ size: "2.5rem" }}>
          <div className="
            relative
            after:absolute after:top-[-1px] after:right-[-1px]
            after:content-[' '] after:w-[0.5rem] after:h-[0.5rem] after:rounded-[50%]
            after:bg-red-600
            ">
            <Button type="text" icon={<AiOutlineGift />}/>
            </div>
          <div>
            <Button type="text" icon={<LuSettings />}/>
          </div>
        </IconContext.Provider>
      </div>
      <div className="flex gap-[40px] items-center">
        <Button
          iconSize="2rem"
          icon={<BsTelephoneOutbound />}
        >
          Join a Call
        </Button>
        <Button
          href='/join'
          iconSize="2rem"
          type="primary"
          icon={<BiUser />}
        >
          Join In
        </Button>
      </div>
    </header>
  );
};
