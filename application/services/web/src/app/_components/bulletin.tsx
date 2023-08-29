'use client'

import Image from 'next/image'

export const Bullerin = () => (
  <article
    className="
    row-span-3
    border rounded-[25px] border-slate-50/25 drop-shadow-xl
    bg-zinc-700/10 backdrop-blur-sm

    overflow-hidden
    "
  >
    <div
      className="text-center 
      h-full
      flex flex-col justify-center items-center
      bg-cover bg-center
      bg-gradient-to-b from-blue-800/60 to-red-600/10
      relative
      "
    >
      <Image
        width={100}
        height={100}
        src="/Bulletin-1.png"
        alt="Image"
        className="z-[-1] absolute w-full h-full object-cover"
      />
      <header>
        <h1
          className="
          font-black text-[30px] text-transparent
          bg-gradient-to-r from-[#FFE853] to-[#FF343F] bg-clip-text
          mb-[20px]
          "
        >
          Around The Globe, Just Pick Where
        </h1>
      </header>
      <p className="text-zinc-50/60">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut
        dolor elit. In ornare posuere.
      </p>
      <div className="absolute bottom-[20px] flex gap-[20px]">
        <span
          className="
          w-[10px] h-[10px] 
          rounded-full bg-zinc-50
          "
        />
        <span
          className="
          w-[10px] h-[10px] 
          rounded-full border border-zinc-50/60
          "
        />
        <span
          className="
          w-[10px] h-[10px] 
          rounded-full border 
          border-zinc-50/60
          "
        />
      </div>
    </div>
  </article>
)
