'use client'

/* eslint-disable jsx-a11y/click-events-have-key-events*/
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
import {useRouter} from 'next/navigation'
import {MouseEventHandler, ReactNode, useRef} from 'react'

import {classname} from '@/ui/common/utils/classname'

export default function JoinModal({children}: {children: ReactNode}) {
  const router = useRouter()

  const formRef = useRef<HTMLDivElement>(null)
  const outsideClick: MouseEventHandler<HTMLDialogElement> = (evt) => {
    if (!formRef.current?.contains(evt.target as Node)) {
      router.back()
    }
  }

  return (
    <dialog
      className={classname([
        'w-full h-full z-10 fixed',
        'bg-slate-900',
        'flex justify-center items-center',
        'text-zinc-50/60',
      ])}
      onClick={outsideClick}
    >
      <div
        className={classname(['w-2/4 max-w-[60rem]'])}
        ref={formRef}
      >
        {children}
      </div>
    </dialog>
  )
}
