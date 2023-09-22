import {cookies} from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import {fetchIam} from '@/network/auth/requests/iam.request'
import {Button} from '@/ui/common/components/button'
import {
  AiOutlineGift,
  BiUser,
  BsTelephoneOutbound,
  LuSettings,
} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'

export const Header = async () => {
  const accessToken = cookies().get('accessToken')?.value

  const body = accessToken ? await fetchIam({accessToken}) : null

  return (
    <header
      className={classname([
        'flex justify-between items-center pt-[4rem]',
        'font-bold',
      ])}
    >
      <Link href={'/'}>
        <div className={classname(['flex'])}>
          <Image
            width={130}
            height={35}
            src="/Logo.png"
            alt="Logo"
          />
          <div
            className={classname([
              'h-[3.5rem] w-[0.2rem] ml-[4rem]',
              'bg-gray-50/25',
            ])}
          />
        </div>
      </Link>
      <nav>
        <ul className={classname(['xl:flex gap-[4rem] hidden'])}>
          <li>About Us</li>
          <li>Rouad Map</li>
          <li>Donate</li>
          <li>Register</li>
        </ul>
      </nav>
      <div className={classname(['md:flex gap-[4rem] hidden'])}>
        <div
          className={classname([
            'relative',
            'after:absolute after:top-[-1px] after:right-[-1px]',
            "after:content-[' ']",
            'after:w-[0.5rem] after:h-[0.5rem] after:rounded-[50%]',
            'after:bg-red-600',
          ])}
        >
          <Button
            type="text"
            iconSize={'2.5rem'}
            icon={<AiOutlineGift />}
          />
        </div>
        <div>
          <Button
            iconSize={'2.5rem'}
            type="text"
            icon={<LuSettings />}
          />
        </div>
      </div>
      {body ? (
        <div>{body.email}</div>
      ) : (
        <div className={classname(['md:flex gap-[2rem] items-center hidden'])}>
          <Button
            iconSize="2rem"
            icon={<BsTelephoneOutbound />}
          >
            Join a Call
          </Button>
          <Button
            href="/join"
            iconSize="2rem"
            type="primary"
            icon={<BiUser />}
          >
            Join In
          </Button>
        </div>
      )}
    </header>
  )
}
