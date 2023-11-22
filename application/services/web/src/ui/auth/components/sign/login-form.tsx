'use server'

import React from 'react'

import {loginAction} from '@/ui/auth/components/sign/actions/sign.action'
import {Button} from '@/ui/common/components/button'
import {Card} from '@/ui/common/components/card'
import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  BiLogoFacebook,
  BsEnvelope,
  HiOutlineLockClosed,
  IconProvider,
} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'

export const LoginForm = () => (
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
            'bg-gradient-to-r to-[#FF343F] from-[#FFE853]',
          ])}
        >
          Login to your Account
        </Card.Title>
        <div className={classname(['text-center'])}>
          Want to register{' '}
          <Button
            type="link"
            href={'?variant=register'}
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
        <div>or use your email for login:</div>
      </header>
      <form action={loginAction}>
        <div className={classname(['flex flex-col gap-[2rem]'])}>
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
          <div className={classname(['flex justify-center'])}>
            <Button
              type="primary"
              className={classname(['py-[2rem] px-[6rem]'])}
              htmlType="submit"
            >
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  </Card>
)
