'use client'

import {useEffect, useRef} from 'react'

import {classname} from '@/ui/common/utils/classname'

interface Props {
  ownStream: MediaStream | undefined
  answererStream: MediaStream | undefined
}

export const Conference = ({ownStream, answererStream}: Props) => {
  const userVideoRef = useRef<null | HTMLVideoElement>(null)
  const targetVideoRef = useRef<null | HTMLVideoElement>(null)

  useEffect(() => {
    if (!ownStream || !userVideoRef.current) {
      return
    }
    userVideoRef.current.srcObject = ownStream
  }, [ownStream])

  useEffect(() => {
    if (!answererStream || !targetVideoRef.current) {
      return
    }

    targetVideoRef.current.srcObject = answererStream
  }, [answererStream])

  return (
    <section>
      <div className={classname(['flex gap-3'])}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className={classname(['w-2/4'])}
          ref={userVideoRef}
          id="user-1"
          autoPlay
          playsInline
        />
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className={classname(['w-2/4'])}
          ref={targetVideoRef}
          id="user-2"
          autoPlay
          playsInline
        />
      </div>
    </section>
  )
}
