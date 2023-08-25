'use client'

import Image from 'next/image'
import {IconContext} from 'react-icons'
import {AiOutlineTwitter} from 'react-icons/ai'
import {BiLogoTelegram} from 'react-icons/bi'
import {BsCameraVideo, BsInstagram} from 'react-icons/bs'

import {ExploreWorld} from '@/app/_components/explore-world'
import {Header} from '@/app/_components/header'
import {Meetings} from '@/app/_components/meeting'

export default function Home() {
  return (
    <>
      <main className="w-4/5 mx-auto">
        <Header />
        <section
          className="
          grid grid-cols-2 grid-rows-home
          mt-[40px] gap-[40px]
          "
        >
          <ExploreWorld />
          <Meetings />
          <article
            className="
            row-span-4
            p-[20px]
            border rounded-[25px] border-slate-50/25 drop-shadow-xl
            bg-main/40
            "
          >
            <header>
              <div>Tooltip</div>
            </header>
            <h1>Support Unique Ideas</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ut dolor elit. In ornare posuere.
            </p>
          </article>
          <article
            className="
            row-span-3
            p-[20px]
            border rounded-[25px] border-slate-50/25 drop-shadow-xl
            bg-main/40
            "
          >
            <header>
              <div>Tooltip</div>
            </header>
            <h1>Around The Globe, Just Pick Where</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ut dolor elit. In ornare posuere.
            </p>
          </article>
          <article
            className="
            row-span-2 col-span-2
            p-[20px]
            border rounded-[25px] border-slate-50/25 drop-shadow-md
            bg-main/40
            "
          >
            <header>
              <div>Tooltip</div>
            </header>
            <h1>Roadmap</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              ut dolor elit. In ornare posuere.
            </p>
          </article>
        </section>
      </main>
      <footer
        className="
        bg-zinc-950
        mt-[40px]
        py-[40px] px-[90px]
        "
      >
        <div className="flex justify-between mb-[20px]">
          <div>
            <Image
              width={130}
              height={35}
              src="/logo.png"
              alt="Logo"
            />
          </div>

          <IconContext.Provider value={{size: '25px'}}>
            <ul className="flex gap-[20px] items-center">
              <li>
                <button
                  className="
                flex gap-[13px] items-center
                py-[13px] px-[30px] rounded-[50px] 
                border border-slate-50/25
                "
                >
                  <BsCameraVideo />
                  <span>Start Call</span>
                </button>
              </li>

              <li>
                <button
                  className="
                flex
                p-[17px] rounded-[50px] 
                border border-slate-50/25
                "
                >
                  <AiOutlineTwitter />
                </button>
              </li>
              <li>
                <button
                  className="
                flex
                p-[17px] rounded-[50px] 
                border border-slate-50/25
                "
                >
                  <BsInstagram />
                </button>
              </li>
              <li>
                <button
                  className="
                flex
                p-[17px] rounded-[50px] 
                border border-slate-50/25
                "
                >
                  <BiLogoTelegram />
                </button>
              </li>
            </ul>
          </IconContext.Provider>
        </div>
        <div className="font-bold flex justify-between">
          <nav className="flex">
            <ul className="flex gap-[40px]">
              <li>Terms and Conditionals</li>
              <li>Privacy Policy</li>
              <li>About Us</li>
              <li>Rouamap</li>
              <li>Donate</li>
              <li>Register</li>
            </ul>
          </nav>
          <span>Copyright © 2023. All rights reserved.</span>
        </div>
      </footer>
    </>
  )
}
