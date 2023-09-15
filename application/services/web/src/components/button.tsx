import Link from 'next/link'
import {cloneElement, createElement} from 'react'
import {IconContext} from 'react-icons'

import {classname} from '@/common/utils/classname'

type ButtonType = 'primary' | 'link' | 'text' | 'icon'

type ButtonProps = {
  children?: React.ReactNode
  iconSize?: string
  icon?: React.ReactNode
  type?: ButtonType
  href?: string
  className?: string
}

export const Button = ({
  iconSize,
  icon,
  children,
  type,
  href,
  className,
}: ButtonProps) => {
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

  const component = href ? createElement(Link, {href}) : createElement('button')

  return cloneElement(
    component,
    {
      className: classname([
        'font-bold text-[14px] text-blue-100',
        'flex gap-[1.3rem] items-center',
        'py-[1.3rem] px-[3rem] rounded-[5rem]',
        'border border-slate-50/25',
        ...classTypes,
        className ?? '',
      ]),
    },
    iconComponent,
    label
  )
}
