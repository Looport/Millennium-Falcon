import {IconContext} from 'react-icons'

import {classname} from '@/common/utils/classname'

type HomeCardProps = {
  children?: React.ReactNode
  className?: string
}

export const HomeCard = ({children, className}: HomeCardProps) => (
  <article
    className={classname([
      'p-[2rem]',
      'border rounded-[2.5rem] border-slate-50/25 drop-shadow-xl',
      'bg-zinc-700/10 backdrop-blur-sm',
      'overflow-hidden',
      className ?? '',
    ])}
  >
    {children}
  </article>
)

type TitleProps = {
  children?: React.ReactNode
  className?: string
}

HomeCard.Title = function Title({children, className}: TitleProps) {
  return (
    <h2
      className={classname([
        'font-black text-[3rem] text-transparent bg-clip-text',
        className ?? '',
      ])}
    >
      {children}
    </h2>
  )
}

type TextProps = {
  children?: React.ReactNode
  className?: string
}

HomeCard.Text = function Text({children, className}: TextProps) {
  return (
    <p className={classname(['text-zinc-50/60', className ?? ''])}>
      {children}
    </p>
  )
}

type TooltipProps = {
  text: string
  icon: React.ReactNode
}

HomeCard.Tooltip = function Tooltip({text, icon}: TooltipProps) {
  return (
    <div className={classname(['flex items-center gap-[1rem]'])}>
      <IconContext.Provider value={{size: '1.4rem'}}>
        {icon}
      </IconContext.Provider>
      <span className={classname(['font-bold text-[2rem] text-white'])}>
        {text}
      </span>
    </div>
  )
}
