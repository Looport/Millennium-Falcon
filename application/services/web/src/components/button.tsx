import {cloneElement, createElement} from 'react'
import {IconContext} from 'react-icons'

export const Button = ({iconSize, icon, children, type, href, className}) => {
  let iconComponent

  const iSize = iconSize ?? '2.4rem'
  if (icon) {
    iconComponent = (
      <IconContext.Provider value={{size: iSize}}>{icon}</IconContext.Provider>
    )
  }

  const classTypes = []
  if (type === 'primary') {
    classTypes.push('bg-blue-500')
  }
  if (type === 'link') {
    classTypes.push('underline')
    classTypes.push('decoration-solid')
    classTypes.push('border-none')
    classTypes.push('p-[0!important]')
  }
  if (type === 'text') {
    classTypes.push('border-none')
    classTypes.push('p-[0!important]')
  }
  if (type === 'icon') {
    classTypes.push('p-[1.7rem!important]')
  }

  let label
  if (children) {
    label = <span>{children}</span>
  }

  let component = createElement('button')
  if (href) {
    component = createElement('a', {href})
  }

  return cloneElement(
    component,
    {
      className: `
      font-bold text-[14px]
      flex gap-[1.3rem] items-center
      py-[1.3rem] px-[3rem] rounded-[5rem] 
      border border-slate-50/25
  
      ${classTypes.join(' ')}

      ${className}
      `,
    },
    iconComponent,
    label
  )
}
