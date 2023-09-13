'use client'
import React from 'react'
import {IconContext} from 'react-icons'
import {AiOutlineGoogle, AiOutlineTwitter} from 'react-icons/ai'
import {BiLogoFacebook} from 'react-icons/bi'
import {BsCheckLg, BsEnvelope} from 'react-icons/bs'
import {FiUser} from 'react-icons/fi'
import {HiOutlineLockClosed} from 'react-icons/hi'

import {HomeCard} from '@/app/_components/home-card'
import {Button} from '@/components/button'

export default function Page() {
  return (
    <dialog
      open
      className="
        w-full h-full z-10 fixed
        bg-slate-900/40
        flex justify-center items-center
        text-zinc-50/60
      "
    >
      <HomeCard
        className="w-2/4 max-w-[60rem] py-[4rem]
      overflow-visible
      relative

      before:absolute before:top-[7rem] before:right-[-4rem]
      before:content-[' '] before:w-[8rem] before:h-[8rem]
      before:bg-[url('/Elips-Blue.png')] before:bg-no-repeat
      before:bg-[length:cover] before:rounded-[2.5rem]

      after:absolute after:bottom-[7rem] after:left-[-4rem]
      after:content-[' '] after:w-[8rem] after:h-[8rem]
      after:bg-[url('/Elips-Orange.png')] after:bg-no-repeat
      after:bg-[length:cover] after:rounded-[2.5rem]
      "
      >
        <div className="w-3/4 mx-auto">
          <header className="text-center flex flex-col gap-[2rem] mb-[2rem]">
            <HomeCard.Title
              className="
              bg-gradient-to-r from-[#FFE853] to-[#FF343F]
              "
            >
              Create an Account
            </HomeCard.Title>
            <div className="text-center">Already registered? Click here</div>
            <ul className="flex gap-[2rem] justify-center">
              <li className="sm:block hidden">
                <Button
                  href="/google"
                  type="icon"
                  icon={<AiOutlineGoogle />}
                />
              </li>
              <li className="sm:block hidden">
                <Button
                  href="/facebook"
                  type="icon"
                  icon={<BiLogoFacebook />}
                />
              </li>
              <li className="sm:block hidden">
                <Button
                  href="/twitter"
                  type="icon"
                  icon={<AiOutlineTwitter />}
                />
              </li>
            </ul>

            <div>or use your email for registration:</div>
          </header>
          <div>
            <form>
              <div className="flex flex-col gap-[2rem]">
                <div className="relative">
                  <div
                    className="
                    absolute top-[50%] translate-y-[-50%] ml-[1.3rem]
                    "
                  >
                    <IconContext.Provider value={{size: '2.4rem'}}>
                      <FiUser />
                    </IconContext.Provider>
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    className="
                    w-full
                    py-[1.5rem] bg-white/20 rounded-full
                    pl-[5rem] pr-[1.5rem]
                    "
                  />
                </div>
                <div className="relative">
                  <div
                    className="
                    absolute top-[50%] translate-y-[-50%] ml-[1.3rem]
                    "
                  >
                    <IconContext.Provider value={{size: '2.4rem'}}>
                      <BsEnvelope />
                    </IconContext.Provider>
                  </div>
                  <input
                    type="text"
                    placeholder="Email"
                    className="
                    w-full
                    py-[1.5rem] bg-white/20 rounded-full
                    pl-[5rem] pr-[1.5rem]
                    "
                  />
                </div>
                <div className="relative">
                  <div
                    className="
                    absolute top-[50%] translate-y-[-50%] ml-[1.3rem]
                    "
                  >
                    <IconContext.Provider value={{size: '2.4rem'}}>
                      <HiOutlineLockClosed />
                    </IconContext.Provider>
                  </div>
                  <input
                    type="text"
                    placeholder="Password"
                    className="
                    w-full
                    py-[1.5rem] bg-white/20 rounded-full
                    pl-[5rem] pr-[1.5rem]
                    "
                  />
                </div>
                <div className="text-[1.2rem]">
                  <div className="w-3/4 mx-auto flex items-center gap-[1.2rem]">
                    <label className="relative block w-[1.8rem] h-[1.8rem]">
                      <input
                        name="policy"
                        type="checkbox"
                        className="hidden peer"
                      />
                      <span
                        className="
                        bg-transparent border border-zinc-50/80
                        w-[1.8rem] h-[1.8rem] rounded-lg block
                        "
                      />
                      <div
                        className="
                        absolutetop-[50%] left-[50%]
                        translate-y-[-50%] translate-x-[-50%]
                        peer-checked:block hidden
                       "
                      >
                        <IconContext.Provider value={{size: '1.5rem'}}>
                          <BsCheckLg />
                        </IconContext.Provider>
                      </div>
                    </label>
                    I can confirm that I have read and accepted the Terms of Use
                    and Privacy Policy*
                  </div>
                </div>
                <div className="text-[1.2rem]">
                  <div
                    className="
                    w-3/4 mx-auto  flex items-center gap-[1.2rem]
                    "
                  >
                    <label className="relative block w-[1.8rem] h-[1.8rem]">
                      <input
                        name="news"
                        type="checkbox"
                        className="hidden peer"
                      />
                      <span
                        className="
                     bg-transparent border border-zinc-50/80
                     w-[1.8rem] h-[1.8rem] rounded-lg block
                     "
                      />
                      <div
                        className="
                        absolute top-[50%] left-[50%]
                         translate-y-[-50%] translate-x-[-50%]
                         peer-checked:block hidden
                         "
                      >
                        <IconContext.Provider value={{size: '1.5rem'}}>
                          <BsCheckLg />
                        </IconContext.Provider>
                      </div>
                    </label>
                    I don’t mind getting emails with news, promotions, and
                    special offers
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    type="primary"
                    className="py-[2rem] px-[6rem]"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </HomeCard>
    </dialog>
  )
}
