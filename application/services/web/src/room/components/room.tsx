'use client'

import Image from 'next/image'
import React, {useCallback, useEffect} from 'react'

import {getToken} from '@/auth/lib/token.client'
import {Button} from '@/common/components/button'
import {IconProvider, VscSend} from '@/common/components/icons'
import {classname} from '@/common/utils/classname'
import {RoomResponse} from '@/room/interfaces/room-response.interface'
import {requestCreateMessage} from '@/room/requests/create-message.request'
import {requestFindMessagesByRoomId} from '@/room/requests/find-messages-by-room-id.request'

export default function Room({room}: {room: RoomResponse}) {
  const handleMessageFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const token = getToken()
      if (!token) {
        throw new Error('Token is not defined')
      }

      await requestCreateMessage(
        {
          roomId: room.id,
          // eslint-disable-next-line github/async-currenttarget
          text: event.currentTarget.message.value,
        },
        token
      )
    },
    [room.id]
  )

  useEffect(() => {
    const accessToken = getToken()
    if (!accessToken) {
      throw new Error('Token is not defined')
    }
    requestFindMessagesByRoomId(room.id, {accessToken})
  }, [room.id])

  return (
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
        <div className={classname(['flex-1'])}>videos</div>
        <div
          className={classname([
            'w-[45rem] border-l-[1px] border-slate-50/10 drop-shadow-xl',
            'bg-zinc-900/80 backdrop-blur-sm',

            'flex flex-col',
            'px-[5rem] py-[1rem]',
          ])}
        >
          <div
            className={classname([
              'h-[6rem]',
              'border-b-[1px] border-slate-50/25',
            ])}
          />
          <div className={classname(['flex-1'])}>chat</div>
          <form onSubmit={handleMessageFormSubmit}>
            <div className={classname(['h-[10rem]'])}>
              <div className={classname(['relative'])}>
                <div
                  className={classname([
                    'absolute',
                    'top-[50%] translate-y-[-50%]',
                    'right-[0]',
                    'mr-[1.3rem]',
                  ])}
                >
                  <Button
                    type="text"
                    htmlType="submit"
                    icon={
                      <IconProvider value={{size: '2.4rem'}}>
                        <VscSend />
                      </IconProvider>
                    }
                  />
                </div>
                <input
                  name="message"
                  type="text"
                  placeholder="Type message..."
                  className={classname([
                    'bg-white/20',
                    'w-full rounded-full',
                    'py-[1.5rem] pr-[5rem] pl-[1.5rem]',
                  ])}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
