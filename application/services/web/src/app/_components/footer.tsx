import Image from 'next/image'
import {IconContext} from 'react-icons'
import {AiOutlineTwitter} from 'react-icons/ai'
import {BiLogoTelegram} from 'react-icons/bi'
import {BsCameraVideo, BsInstagram} from 'react-icons/bs'

export const Footer = () => (
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
)
