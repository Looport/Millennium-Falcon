import {IconContext} from 'react-icons'

export const HomeCard = ({children, className}) => (
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

HomeCard.Title = ({children, className}) => (
  <h2
    className={`
    font-black text-[3rem] text-transparent bg-clip-text

    ${className}
    `}
  >
    {children}
  </h2>
)
HomeCard.Title.displayName = 'Title'

HomeCard.Text = ({children, className}) => (
  <p className={`text-zinc-50/60 ${className}`}>{children}</p>
)
HomeCard.Text.displayName = 'Text'

HomeCard.Tooltip = ({text, icon}) => (
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
HomeCard.Tooltip.displayName = 'Tooltip'
