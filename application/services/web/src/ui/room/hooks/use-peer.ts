import Peer, {MediaConnection} from 'peerjs'
import {useEffect, useState} from 'react'

export const usePeer = () => {
  const [peerId, setPeerId] = useState<undefined | string>(undefined)
  const [peer, setPeer] = useState<undefined | Peer>(undefined)

  const [ownCall, setOwnCall] = useState<undefined | MediaConnection>(undefined)
  const [answererCall, setAnswererCall] = useState<undefined | MediaConnection>(
    undefined
  )

  const [ownStream, setOwnStream] = useState<undefined | MediaStream>()
  const [answererStream, setAnswererStream] = useState<
    undefined | MediaStream
  >()

  useEffect(() => {
    if (!peer) {
      setPeer(new Peer())
      return
    }

    peer.on('open', (id) => {
      setPeerId(id)
    })

    peer.on('call', (call) => {
      setOwnCall(call)
    })

    /*
     * return () => {
     *   peer.destroy()
     * }
     */
  }, [peer])

  useEffect(() => {
    if (!ownCall) {
      return
    }

    ownCall.answer(ownStream)

    ownCall.on('stream', (stream) => {
      setAnswererStream(stream)
    })
  }, [answererCall, ownCall, ownStream])

  useEffect(() => {
    if (!answererCall) {
      return
    }

    answererCall.on('stream', (stream) => {
      setAnswererStream(stream)
    })
  }, [answererCall, ownCall])

  useEffect(() => {
    if (!ownCall) {
      return
    }

    ownCall.answer(ownStream)

    ownCall.on('stream', (stream) => {
      setAnswererStream(stream)
    })
  }, [answererCall, ownCall, ownStream])

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((stream) => {
        setOwnStream(stream)
      })
  }, [])

  const startCall = (targetPeer: string) => {
    if (!peer || !ownStream) {
      return
    }

    setAnswererCall(peer.call(targetPeer, ownStream))
  }

  return {
    answererCall,
    answererStream,
    ownCall,
    ownStream,
    peer,
    peerId,
    startCall,
  }
}
