import {classname} from "@/ui/common/utils/classname";
import React from "react";
import {VscSend, IconProvider} from "@/ui/common/components/icons";
import Image from "next/image";
import {Logout} from "@/ui/home/components/logout";

export default function Page() {
  return (
    <main className={classname(['w-full h-screen'])}>
      <div className={classname(['flex h-full'])}>
        <div className={classname([
          'w-[10rem] py-[2rem]',
          'flex flex-col',
          'items-center'
        ])}>
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
        <div className={classname(['flex-1'])}>
          videos
        </div>
        <div  className={classname([
          'w-[45rem] border-l-[1px] border-slate-50/10 drop-shadow-xl',
          'bg-zinc-900/80 backdrop-blur-sm',

          'flex flex-col',
          'px-[5rem] py-[1rem]'
        ])}>
          <div className={classname([
            'h-[6rem]',
            'border-b-[1px] border-slate-50/25'
          ])}>
          </div>
          <div  className={classname(['flex-1'])}>
            chat
          </div>
          <div  className={classname(['h-[10rem]'])}>
            <div className={classname(['relative'])}>
              <div
                className={classname([
                  'absolute',
                  'top-[50%] translate-y-[-50%]',
                  'right-[0]',
                  'mr-[1.3rem]',
                ])}
              >
                <IconProvider value={{size: '2.4rem'}}>
                  <VscSend />
                </IconProvider>
              </div>
              <input
                name="email"
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
        </div>
      </div>
    </main>
  )
}