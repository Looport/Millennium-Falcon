import {cookies} from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import {fetchIam} from '@/auth/requests/iam.request'
import {Button} from '@/ui/common/components/button'
import {
  AiOutlineGift,
  BiUser,
  BsTelephoneOutbound,
  LuSettings,
  FiCalendar,
  FiMap,
  BsFastForward,
} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'
import {getHeaders} from '@/ui/common/utils/get-headers'
import {Logout} from '@/ui/home/components/logout'

export const Header = async () => {
  const accessToken = cookies().get('accessToken')?.value
  const body = accessToken
    ? await fetchIam({accessToken, headers: getHeaders()})
    : null

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
          {!body && (
            <>
              <li>About Us</li>
              <li>Road Map</li>
              <li>Donate</li>
              <li>Register</li>
            </>
          )}
          {body && (
            <>
              <li>
                <Button
                  type="text"
                  iconSize={'2rem'}
                  icon={<FiMap />}
                >
                  Explore Map
                </Button>
              </li>
              <li>
                <Button
                  type="text"
                  iconSize={'2rem'}
                  icon={<BsFastForward />}
                >
                  Play Roulette
                </Button>
              </li>
              <li>
                <Button
                  type="text"
                  iconSize={'2rem'}
                  icon={<FiCalendar />}
                >
                  Schedule
                </Button>
              </li>
              <li>
                <Button
                  type="text"
                  iconSize={'2rem'}
                  className={classname(['text-white/80'])}
                  icon={<BsTelephoneOutbound />}
                >
                  Join a Call
                </Button>
              </li>
            </>
          )}
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
            type="text"
            iconSize={'2.5rem'}
            icon={<LuSettings />}
          />
        </div>
      </div>
      <div className={classname(['md:flex gap-[2rem] items-center hidden'])}>
        {!body && (
          <>
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
          </>
        )}
        {body && (
          <>
            <div
              className={classname([
                'w-[4.7rem] h-[4.7rem] rounded-full',
                'border-2 border-slate-50/60',
                'relative',
              ])}
            >
              <label
                htmlFor="user-nav"
                className={classname(['cursor-pointer'])}
              >
                <Image
                  className={classname(['rounded-full'])}
                  aria-label={body.email}
                  width={47}
                  height={47}
                  src="/Avatar.png"
                  alt="avatar"
                />
              </label>
              <input
                type="checkbox"
                id="user-nav"
                className={classname(['peer hidden'])}
              />
              <div
                className={classname([
                  'absolute top-[100%] z-10 mt-[1rem]',
                  'hidden peer-checked:block',
                ])}
              >
                <ul className={classname(['cursor-pointer'])}>
                  <Logout>
                    <li>Logout</li>
                  </Logout>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
