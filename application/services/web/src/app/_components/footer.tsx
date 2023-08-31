import Image from 'next/image'
import {IconContext} from 'react-icons'
import {AiOutlineTwitter} from 'react-icons/ai'
import {BiLogoTelegram} from 'react-icons/bi'
import {BsCameraVideo, BsInstagram} from 'react-icons/bs'

export const Footer = () => (
  <footer
    className="
        bg-zinc-950
        mt-[4rem]
        py-[4rem] px-[9rem]
        "
  >
    <div className="flex justify-between mb-[2rem]">
      <div>
        <Image
          width={130}
          height={35}
          src="/Logo.png"
          alt="Logo"
        />
      </div>

      <IconContext.Provider value={{size: '2.5rem'}}>
        <ul className="flex gap-[2rem] items-center">
          <li>
            <button
              className="
                flex gap-[1.3rem] items-center
                py-[1.3rem] px-[3rem] rounded-[5rem] 
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
                p-[1.7rem] rounded-[5rem] 
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
                p-[1.7rem] rounded-[5rem] 
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
                p-[1.7rem] rounded-[5rem] 
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
        <ul className="flex gap-[4rem]">
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
)
