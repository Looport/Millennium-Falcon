import {IconContext} from 'react-icons'

type HomeCardProps = {
  children?: React.ReactNode
  className?: string
}

export const HomeCard = ({children, className}: HomeCardProps) => (
  <article
    className={`
    p-[2rem]
    border rounded-[2.5rem] border-slate-50/25 drop-shadow-xl
    bg-zinc-700/10 backdrop-blur-sm
    overflow-hidden

    ${className}
    `}
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
      className={`
    font-black text-[3rem] text-transparent bg-clip-text

    ${className}
    `}
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
    <p className={`text-zinc-50/60 ${className}`}>{children}</p>
  )
}

type TooltipProps = {
  text: string
  icon: React.ReactNode
}

HomeCard.Tooltip = function Tooltip({text, icon}: TooltipProps) {
  return (
    <div className="flex items-center gap-[1rem]">
      <IconContext.Provider value={{size: '1.4rem'}}>{icon}</IconContext.Provider>
      <span
        className="
        font-bold text-[2rem] text-white
        "
      >
      {text}
    </span>
    </div>
  )
}