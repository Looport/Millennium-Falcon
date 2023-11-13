import {BsCheckLg, IconProvider} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'

export const RegisterCheckboxes = () => (
  <div className={classname(['text-[1.2rem]'])}>
    <div
      className={classname([
        'w-3/4',
        'mx-auto',
        'flex',
        'items-center',
        'gap-[1.2rem]',
      ])}
    >
      <label className={classname(['relative block w-[1.8rem] h-[1.8rem]'])}>
        <input
          name="privacy"
          type="checkbox"
          className="hidden peer"
        />
        <span
          className={classname([
            'w-[1.8rem] h-[1.8rem] rounded-lg block border',
            'bg-transparent border-zinc-50/80',
          ])}
        />
        <div
          className={classname([
            'absolute',
            'top-[50%] left-[50%]',
            'translate-y-[-50%] translate-x-[-50%]',
            'peer-checked:block hidden',
          ])}
        >
          <IconProvider value={{size: '1.5rem'}}>
            <BsCheckLg />
          </IconProvider>
        </div>
      </label>
      I don’t mind getting emails with news, promotions, and special offers
    </div>
  </div>
)
