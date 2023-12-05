'use client'

import {FormEvent, useEffect, useRef} from 'react'

import {classname} from '@/ui/common/utils/classname'
import {usePeer} from '@/ui/room/hooks/use-peer'

export const Video = () => {
  const {peerId, ownStream, answererStream, startCall} = usePeer()

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

  const handleCall = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    startCall(event.currentTarget.elements.peerId.value)
  }

  return (
    <section>
      <div>
        <b>Peer Id:</b> {peerId}
      </div>
      <form onSubmit={handleCall}>
        <label htmlFor="peerId">Peer Id:</label>
        <br />
        <input
          id="peerId"
          type="text"
        />
        <br />
        <button type="submit">Call</button>
      </form>
      <div className={classname(['flex gap-3'])}>
        <video
          className={classname(['w-2/4'])}
          ref={userVideoRef}
          id="user-1"
          autoPlay
          playsInline
        />
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
