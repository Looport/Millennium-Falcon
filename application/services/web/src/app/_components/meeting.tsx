"use client";

import Image from "next/image";
import { IconContext } from "react-icons";
import { BiUserCircle } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";
import { HomeCard } from "./home-card";
import { Button } from "@/components/button";

export const Meetings = () => (
  <HomeCard className="
    h-full

    relative

    before:absolute before:top-[0px] before:right-[0px]
    before:content-[' '] before:w-[100%] before:h-[10rem]
    before:bg-[url('/Meeting-Top-Wave.png')] before:bg-no-repeat
    before:bg-[length:cover] before:rounded-[2.5rem]

    after:absolute after:bottom-[0] after:left-[0px]
    after:content-[' '] after:w-[100%] after:h-[10rem]
    after:bg-[url('/Meeting-Bottom-Wave.png')] after:bg-no-repeat
    after:bg-[length:cover] after:bg-[top_82%_left_0] after:rounded-[2.5rem]
    ">
    <div className="translate-y-[-50%] absolute top-[50%]">
      <header className="mb-[2rem]">
        <h3 className="
          font-bold text-[2rem] text-white
          mb-[2rem]
          ">
          Communicate in a New Way
        </h3>
        <HomeCard.Title className="
          bg-gradient-to-r from-[#FFE853] to-[#FF343F]
          ">
          Quick & Functional Meetings For Everyone
        </HomeCard.Title>
        <HomeCard.Text>
          With AI-powered features and useful built-in Utilities, our app will
          become an indispensable companion for any type of conversation.
        </HomeCard.Text>
      </header>
      <div className="flex items-center gap-[1rem] mb-[2rem]">
        <Button
          type="primary"
          icon={<BiUserCircle />}
        >
          Join Now
        </Button>
        <span>or</span>
        <Button icon={<BsCameraVideo />}>
          Start Call
        </Button>
      </div>
      <div className="flex gap-[1rem] items-center">
        <Image
          width={100}
          height={100}
          src=""
          alt="users icons"
        />
        <div className="flex flex-col">
          <span className="text-white/80 font-extrabold">+5M</span>
          <span className="text-white/60">Worldwide Users</span>
        </div>
      </div>
    </div>
  </HomeCard>
);
