import React from 'react'

import {Button} from '@/ui/common/components/button'
import {IconProvider, VscSend} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'

export const MessageForm = ({
  onSubmit,
}: {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
}) => (
  <form onSubmit={onSubmit}>
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
)
