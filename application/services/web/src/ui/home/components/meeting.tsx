'use client'

import Image from 'next/image'

import {Button} from '@/ui/common/components/button'
import {Card} from '@/ui/common/components/card'
import {BiUserCircle, BsCameraVideo} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'

export const Meetings = () => (
  <Card
    className={classname([
      'h-full',
      'relative',
      'before:absolute before:top-[0px] before:right-[0px]',
      "before:content-[' '] before:w-[100%] before:h-[10rem]",
      "before:bg-[url('/Meeting-Top-Wave.png')] before:bg-no-repeat",
      'before:bg-[length:cover] before:rounded-[2.5rem]',
      'after:absolute after:bottom-[0] after:left-[0px]',
      "after:content-[' '] after:w-[100%] after:h-[10rem]",
      "after:bg-[url('/Meeting-Bottom-Wave.png')] after:bg-no-repeat",
      'after:bg-[length:cover] after:bg-[top_82%_left_0]',
      'after:rounded-[2.5rem]',
      'flex justify-center items-center',
    ])}
  >
    <div className="">
      <header className={classname(['mb-[2rem]'])}>
        <h3
          className={classname([
            'font-bold text-[2rem] text-white',
            'mb-[2rem]',
          ])}
        >
          Communicate in a New Way
        </h3>
        <Card.Title
          className={classname([
            'bg-gradient-to-r from-[#FFE853] to-[#FF343F]',
          ])}
        >
          Quick & Functional Meetings For Everyone
        </Card.Title>
        <Card.Text>
          With AI-powered features and useful built-in Utilities, our app will
          become an indispensable companion for any type of conversation.
        </Card.Text>
      </header>
      <div
        className={classname([
          'flex sm:flex-row flex-col items-center gap-[1rem] mb-[2rem]',
        ])}
      >
        <Button
          href="/join"
          type="primary"
          icon={<BiUserCircle />}
        >
          Join Now
        </Button>
        <span>or</span>
        <Button
          href="/room/f09f8943jfoisjfj34f98j"
          icon={<BsCameraVideo />}
        >
          Start Call
        </Button>
      </div>
      <div
        className={classname([
          'flex sm:flex-row flex-col gap-[1rem] items-center',
        ])}
      >
        <div className={classname(['flex'])}>
          <Image
            width={40}
            height={40}
            src="/Avatar 3.png"
            alt="users icons"
          />
          <Image
            className={classname(['-ml-[2rem]'])}
            width={40}
            height={40}
            src="/Avatar 4.png"
            alt="users icons"
          />
          <Image
            className={classname(['-ml-[2rem]'])}
            width={40}
            height={40}
            src="/Avatar 5.png"
            alt="users icons"
          />
        </div>
        <div className={classname(['flex flex-col'])}>
          <span className={classname(['text-white/80 font-extrabold'])}>
            +5M
          </span>
          <span className={classname(['text-white/60'])}>Worldwide Users</span>
        </div>
      </div>
    </div>
  </Card>
)
