'use client'

import {useRouter} from 'next/navigation'
import {EventHandler, MouseEvent, MouseEventHandler, useRef} from 'react'

export default function JoinInterceptor() {
  const router = useRouter()

  const formRef = useRef<HTMLDivElement>(null)
  /*
   * const outsideClick: MouseEventHandler<HTMLDialogElement> = (e) => {
   *   if (!formRef.current?.contains(e.target as Node)) {
   *     // router.back()
   *   }
   * }
   */

  return <div></div>
}
