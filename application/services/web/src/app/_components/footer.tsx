import Image from 'next/image'
import {IconContext} from 'react-icons'
import {AiOutlineTwitter} from 'react-icons/ai'
import {BiLogoTelegram} from 'react-icons/bi'
import {BsCameraVideo, BsInstagram} from 'react-icons/bs'

import {Button} from '@/components/button'

export const Footer = () => (
  <footer
    className="
    bg-zinc-950
    mt-[4rem]
    py-[4rem] sm:px-[9rem]
    "
  >
    <div className="flex justify-center sm:justify-between mb-[2rem]">
        <div className="sm:block hidden">
        <Image
          width={130}
          height={35}
          src="/Logo.png"
          alt="Logo"
        />
      </div>

      <ul className="flex gap-[2rem] items-center">
        <li>
          <Button icon={<BsCameraVideo />}>Start Call</Button>
        </li>

        <li className="sm:block hidden">
          <Button
            href="/twitter"
            type="icon"
            icon={<AiOutlineTwitter />}
          />
        </li>
        <li className="sm:block hidden">
          <Button
            href="/instagram"
            type="icon"
            icon={<BsInstagram />}
          />
        </li>
        <li className="sm:block hidden">
          <Button
            href="/telegram"
            type="icon"
            icon={<BiLogoTelegram />}
          />
        </li>
      </ul>
    </div>
    <div className="font-bold flex justify-between sm:block hidden">
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