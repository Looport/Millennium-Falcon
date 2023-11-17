import React from 'react'

import {registerAction} from '@/ui/auth/components/sign/actions/sign.action'
import {RegisterCheckboxes} from '@/ui/auth/components/sign/register-checkboxes'
import {Button} from '@/ui/common/components/button'
import {Card} from '@/ui/common/components/card'
import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  BiLogoFacebook,
  BsCheckLg,
  BsEnvelope,
  FiUser,
  HiOutlineLockClosed,
  IconProvider,
} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'

export const RegisterForm = () => (
  <Card
    className={classname([
      'w-full relative py-[4rem] overflow-visible',

      'before:absolute before:top-[7rem] before:right-[-4rem]',
      "before:content-[' '] before:w-[8rem] before:h-[8rem]",
      "before:bg-[url('/Elips-Blue.png')] before:bg-no-repeat",
      'before:bg-[length:cover] before:rounded-[2.5rem]',

      'after:absolute after:bottom-[7rem] after:left-[-4rem]',
      "after:content-[' '] after:w-[8rem] after:h-[8rem]",
      "after:bg-[url('/Elips-Orange.png')] after:bg-no-repeat",
      'after:bg-[length:cover] after:rounded-[2.5rem]',
    ])}
  >
    <div className={classname(['w-3/4 mx-auto'])}>
      <header
        className={classname([
          'text-center flex flex-col gap-[2rem] mb-[2rem]',
        ])}
      >
        <Card.Title
          className={classname([
            'bg-gradient-to-r from-[#FFE853] to-[#FF343F]',
          ])}
        >
          Create an Account
        </Card.Title>
        <div className={classname(['text-center'])}>
          Already registered?{' '}
          <Button
            type="link"
            href={'?variant=login'}
          >
            Click here
          </Button>
        </div>
        <ul className={classname(['flex gap-[2rem] justify-center'])}>
          <li className={classname(['sm:block hidden'])}>
            <Button
              href="/google"
              type="icon"
              icon={<AiOutlineGoogle />}
            />
          </li>
          <li className={classname(['sm:block hidden'])}>
            <Button
              href="/facebook"
              type="icon"
              icon={<BiLogoFacebook />}
            />
          </li>
          <li className={classname(['sm:block hidden'])}>
            <Button
              href="/twitter"
              type="icon"
              icon={<AiOutlineTwitter />}
            />
          </li>
        </ul>
        <div>or use your email for registration:</div>
      </header>
      <form action={registerAction}>
        <div className={classname(['flex flex-col gap-[2rem]'])}>
          <div className={classname(['relative'])}>
            <div
              className={classname([
                'absolute top-[50%] translate-y-[-50%] ml-[1.3rem]',
              ])}
            >
              <IconProvider value={{size: '2.4rem'}}>
                <FiUser />
              </IconProvider>
            </div>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className={classname([
                'w-full py-[1.5rem] bg-white/20',
                'rounded-full pl-[5rem] pr-[1.5rem]',
              ])}
            />
          </div>{' '}
          <div className={classname(['relative'])}>
            <div
              className={classname([
                'absolute',
                'top-[50%] translate-y-[-50%]',
                'ml-[1.3rem]',
              ])}
            >
              <IconProvider value={{size: '2.4rem'}}>
                <BsEnvelope />
              </IconProvider>
            </div>
            <input
              name="email"
              type="text"
              placeholder="Email"
              className={classname([
                'bg-white/20',
                'w-full rounded-full',
                'py-[1.5rem] pl-[5rem] pr-[1.5rem]',
              ])}
            />
          </div>
          <div className="relative">
            <div
              className={classname([
                'absolute top-[50%] translate-y-[-50%] ml-[1.3rem]',
              ])}
            >
              <IconProvider value={{size: '2.4rem'}}>
                <HiOutlineLockClosed />
              </IconProvider>
            </div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className={classname([
                'w-full bg-white/20 rounded-full',
                'py-[1.5rem] pl-[5rem] pr-[1.5rem]',
              ])}
            />
          </div>
          <div className={classname(['text-[1.2rem]'])}>
            <div
              className={classname([
                'w-3/4',
                'mx-auto',
                'flex',
                'items-center',
                'gap-[1.2rem]',
              ])}
            >
              <label
                className={classname(['relative block w-[1.8rem] h-[1.8rem]'])}
              >
                <input
                  name="news"
                  type="checkbox"
                  className="hidden peer"
                />
                <span
                  className={classname([
                    'w-[1.8rem] h-[1.8rem] rounded-lg block',
                    'bg-transparent border border-zinc-50/80',
                  ])}
                />
                <div
                  className={classname([
                    'absolute',
                    'top-[50%] left-[50%]',
                    'translate-y-[-50%] translate-x-[-50%]',
                    'peer-checked:block hidden',
                  ])}
                >
                  <IconProvider value={{size: '1.5rem'}}>
                    <BsCheckLg />
                  </IconProvider>
                </div>
              </label>
              I don’t mind getting emails with news, promotions, and special
              offers
            </div>
          </div>{' '}
          <RegisterCheckboxes />
          <div className={classname(['flex justify-center'])}>
            <Button
              type="primary"
              className={classname(['py-[2rem] px-[6rem]'])}
              htmlType="submit"
            >
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  </Card>
)
