import Image from 'next/image'

import {Button} from '@/ui/common/components/button'
import {
  AiOutlineTwitter,
  BiLogoTelegram,
  BsCameraVideo,
  BsInstagram,
} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'

export const Footer = () => (
  <footer
    className={classname(['bg-zinc-950 mt-[4rem] py-[4rem] sm:px-[9rem]'])}
  >
    <div
      className={classname([
        'flex justify-center sm:justify-between mb-[2rem]',
      ])}
    >
      <div className={classname(['sm:block hidden'])}>
        <Image
          width={130}
          height={35}
          src="/Logo.png"
          alt="Logo"
        />
      </div>

      <ul className={classname(['flex gap-[2rem] items-center'])}>
        <li>
          <Button icon={<BsCameraVideo />}>Start Call</Button>
        </li>

        <li className={classname(['sm:block hidden'])}>
          <Button
            href="/twitter"
            type="icon"
            icon={<AiOutlineTwitter />}
          />
        </li>
        <li className={classname(['sm:block hidden'])}>
          <Button
            href="/instagram"
            type="icon"
            icon={<BsInstagram />}
          />
        </li>
        <li className={classname(['sm:block hidden'])}>
          <Button
            href="/telegram"
            type="icon"
            icon={<BiLogoTelegram />}
          />
        </li>
      </ul>
    </div>
    <div className={classname(['font-bold sm:flex justify-between hidden'])}>
      <nav className={classname(['flex'])}>
        <ul className={classname(['flex gap-[4rem]'])}>
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
