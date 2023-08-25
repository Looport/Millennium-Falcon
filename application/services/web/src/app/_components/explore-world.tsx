import Image from 'next/image'
import {IconContext} from 'react-icons'
import {BiMapAlt} from 'react-icons/bi'
import {BsStars} from 'react-icons/bs'
import {TbUsersPlus} from 'react-icons/tb'

export const ExploreWorld = () => (
  <article
    className="
    row-span-5
    border rounded-[25px] border-slate-50/25 drop-shadow-xl
    bg-main/40
    pb-[80px]
    "
  >
    <header className="flex items-center gap-[10px] p-[20px] mb-[15px]">
      <div className="bg-red-600 rounded-[100px] p-[7px]">
        <IconContext.Provider value={{size: '14px'}}>
          <BsStars />
        </IconContext.Provider>
      </div>
      <span
        className="
        font-bold text-[20px] text-white
        "
      >
        Try New Feature
      </span>
    </header>
    <div className="mx-[35px] text-center">
      <h1
        className="
        font-black text-[30px] text-transparent
        mb-[20px]
        bg-gradient-to-r from-[#FF343F] to-[#FFE853] bg-clip-text
      "
      >
        Around The Globe, Just Pick Where
      </h1>
      <p className="text-zinc-50/60">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut
        dolor elit. In ornare posuere.
      </p>
    </div>
    <div>
      <img
        src="/Explore-Map.png"
        alt="Explore Map"
      />
    </div>
    <div
      className="
      mt-[-20px]
      flex flex-col gap-[5px] justify-center items-center
      "
    >
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
          <BiMapAlt />
        </IconContext.Provider>
        <span> Explore The World</span>
      </a>
      <span>or</span>
      <button
        className="
        flex gap-[13px] items-center
        font-bold underline decoration-solid
        "
      >
        <IconContext.Provider value={{size: '24px'}}>
          <TbUsersPlus />
        </IconContext.Provider>
        <span>Bring Friends With You</span>
      </button>
    </div>
  </article>
)
