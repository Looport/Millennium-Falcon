import Image from 'next/image'
import React, {ReactNode} from 'react'

import {classname} from '@/ui/common/utils/classname'

export const RoomLayout = ({
  messages,
  conference,
}: {
  messages: ReactNode
  conference: ReactNode
}) => (
  <main className={classname(['w-full h-screen'])}>
    <div className={classname(['flex h-full'])}>
      <div
        className={classname([
          'w-[10rem] py-[2rem]',
          'flex flex-col',
          'items-center',
        ])}
      >
        <div
          className={classname([
            'w-[4.7rem] h-[4.7rem] rounded-full',
            'border-2 border-slate-50/60',
            'relative',
          ])}
        >
          <Image
            className={classname(['rounded-full'])}
            width={47}
            height={47}
            src="/Avatar.png"
            alt="avatar"
          />
        </div>
      </div>
      <div className={classname(['flex-1'])}>{conference}</div>
      {messages}
    </div>
  </main>
)
