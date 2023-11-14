/* eslint-disable jsx-a11y/click-events-have-key-events*/
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions*/
'use client'

import {usePathname, useRouter} from 'next/navigation'
import {MouseEventHandler, useRef} from 'react'

import {JoinContainer} from '@/auth/components/join-form/join-container'
import {classname} from '@/common/utils/classname'

export default function JoinInterceptor() {
  const router = useRouter()

  const formRef = useRef<HTMLDivElement>(null)
  const outsideClick: MouseEventHandler<HTMLDialogElement> = (evt) => {
    if (!formRef.current?.contains(evt.target as Node)) {
      router.back()
    }
  }

  /**
   * Warning
   * Need to return null
   * because if we push
   * component doesn't remove
   */
  if (usePathname() !== '/join') {
    return null
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
        <JoinContainer />
      </div>
    </dialog>
  )
}
