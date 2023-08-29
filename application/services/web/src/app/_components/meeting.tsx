'use client'

import Image from 'next/image'
import {IconContext} from 'react-icons'
import {BiUserCircle} from 'react-icons/bi'
import {BsCameraVideo} from 'react-icons/bs'

export const Meetings = () => (
  <article
    className="
    row-span-4
    px-[40px]
    border rounded-[25px] border-slate-50/25 drop-shadow-xl
    bg-zinc-700/10 backdrop-blur-sm
    relative

    before:absolute before:top-[0px] before:right-[0px]
    before:content-[' '] before:w-[100%] before:h-[100px]
    before:bg-[url('/Meeting-Top-Wave.png')] before:bg-no-repeat
    before:bg-[length:cover] before:rounded-[25px]

    after:absolute after:bottom-[0] after:left-[0px]
    after:content-[' '] after:w-[100%] after:h-[100px]
    after:bg-[url('/Meeting-Bottom-Wave.png')] after:bg-no-repeat
    after:bg-[length:cover] after:bg-[top_82%_left_0] after:rounded-[25px]
    "
  >
    <div className="translate-y-[-50%] absolute top-[50%]">
      <header className="mb-[20px]">
        <h2
          className="
          font-bold text-[20px] text-white
          mb-[20px]
          "
        >
          Communicate in a New Way
        </h2>
        <h1
          className="
          font-black text-[30px] text-transparent
          mb-[20px]
          bg-gradient-to-r from-[#FFE853] to-[#FF343F] bg-clip-text
          "
        >
          Quick & Functional Meetings For Everyone
        </h1>
        <p className="text-zinc-50/60">
          With AI-powered features and useful built-in Utilities, our app will
          become an indispensable companion for any type of conversation.
        </p>
      </header>
      <div className="flex items-center gap-[10px] mb-[20px]">
        <a
          className="
        font-bold
        flex gap-[13px] items-center
        py-[13px] px-[30px] rounded-[50px] 
        border border-slate-50/25 bg-blue-500
        "
          href="/world"
        >
          <IconContext.Provider value={{size: '24px'}}>
            <BiUserCircle />
          </IconContext.Provider>
          <span>Join Now</span>
        </a>
        <span>or</span>
        <button
          className="
          flex gap-[13px] items-center
          py-[13px] px-[30px] rounded-[50px] 
          border border-slate-50/25
          "
        >
          <IconContext.Provider value={{size: '24px'}}>
            <BsCameraVideo />
          </IconContext.Provider>
          <span>Start Call</span>
        </button>
      </div>
      <div className="flex gap-[10px] items-center">
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
  </article>
)
