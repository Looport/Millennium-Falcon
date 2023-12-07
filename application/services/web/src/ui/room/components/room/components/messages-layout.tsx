import React from 'react'

import {classname} from '@/ui/common/utils/classname'

export const MessagesLayout = ({children}: {children: React.ReactNode}) => (
  <div
    className={classname([
      'w-[45rem] border-l-[1px] border-slate-50/10 drop-shadow-xl',
      'bg-zinc-900/80 backdrop-blur-sm',

      'flex flex-col',
      'px-[5rem] py-[1rem]',
    ])}
  >
    <div
      className={classname(['h-[6rem]', 'border-b-[1px] border-slate-50/25'])}
    />
    {children}
  </div>
)
