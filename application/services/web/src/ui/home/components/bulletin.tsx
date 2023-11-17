'use client'

import Image from 'next/image'

import {Card} from '@/ui/common/components/card'
import {classname} from '@/ui/common/utils/classname'

export const Bullerin = () => (
  <Card className={classname(['h-full p-[0!important]'])}>
    <div
      className={classname([
        'text-center',
        'h-full',
        'flex flex-col justify-center items-center',
        'bg-cover bg-center',
        'bg-gradient-to-b from-blue-800/60 to-red-600/10',
        'relative',
      ])}
    >
      <Image
        width={100}
        height={100}
        src="/Bulletin-1.png"
        alt="Image"
        className={classname(['z-[-1] absolute w-full h-full object-cover'])}
      />
      <header className={classname(['px-[3.5rem]'])}>
        <Card.Title
          className={classname([
            'bg-gradient-to-r from-[#FFE853] to-[#FF343F]',
          ])}
        >
          Around The Globe, Just Pick Where
        </Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut
          dolor elit. In ornare posuere.
        </Card.Text>
      </header>
      <div className={classname(['absolute bottom-[2rem] flex gap-[2rem]'])}>
        <span
          className={classname([
            'w-[1rem] h-[1rem]',
            'rounded-full bg-zinc-50',
          ])}
        />
        <span
          className={classname([
            'w-[1rem] h-[1rem]',
            'rounded-full border border-zinc-50/60',
          ])}
        />
        <span
          className={classname([
            'w-[1rem] h-[1rem]',
            'rounded-full border',
            'border-zinc-50/60',
          ])}
        />
      </div>
    </div>
  </Card>
)
