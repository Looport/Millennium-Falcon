'use client'

import Image from 'next/image'
import {IconContext} from 'react-icons'
import {AiOutlineGift} from 'react-icons/ai'
import {BiUser} from 'react-icons/bi'
import {BsTelephoneOutbound} from 'react-icons/bs'
import {LuSettings} from 'react-icons/lu'

export const Header = () => {
  console.log('Header')

  return (
    <header
      className="
      flex justify-between items-center pt-[40px]
      font-bold
      "
    >
      <div className="flex">
        <Image
          width={130}
          height={35}
          src="/logo.png"
          alt="Logo"
        />
        <div
          className="
          h-[35px] w-[2px] ml-[40px]
          bg-gray-50/25 
          "
        />
      </div>
      <nav>
        <ul className="flex gap-[40px]">
          <li>About Us</li>
          <li>Rouad Map</li>
          <li>Donate</li>
          <li>Register</li>
        </ul>
      </nav>
      <div className="flex gap-[40px]">
        <IconContext.Provider value={{size: '25px'}}>
          <button
            className="
            relative
            after:absolute after:top-[-1px] after:right-[-1px]
            after:content-[' '] after:w-[5px] after:h-[5px] after:rounded-[50%]
          after:bg-red-600
            "
          >
            <AiOutlineGift />
          </button>
          <button>
            <LuSettings />
          </button>
        </IconContext.Provider>
      </div>
      <div className="flex gap-[40px] items-center">
        <IconContext.Provider value={{size: '20px'}}>
          <button
            className="
            flex gap-[13px] items-center
            py-[13px] px-[30px] rounded-[50px] 
            border border-slate-50/25
            "
          >
            <BsTelephoneOutbound />
            <span>Join a Call</span>
          </button>
          <a
            className="
            flex gap-[13px] items-center
            py-[13px] px-[30px] rounded-[50px] 
            border border-slate-50/25 bg-blue-500
            "
            href="/join"
          >
            <BiUser />
            <span>Join In</span>
          </a>
        </IconContext.Provider>
      </div>
    </header>
  )
}
