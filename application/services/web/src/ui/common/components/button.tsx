'use client'

import Link from 'next/link'
import {cloneElement, createElement, MouseEventHandler} from 'react'

import {IconProvider} from '@/ui/common/components/icons'
import {classname} from '@/ui/common/utils/classname'

type ButtonType = 'primary' | 'link' | 'text' | 'icon'

type ButtonProps = {
  children?: React.ReactNode
  iconSize?: string
  icon?: React.ReactNode
  type?: ButtonType
  href?: string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  htmlType?: 'button' | 'submit' | 'reset'
}

const DEFAULT_ICON_SIZE = '2.4rem'

export const Button = ({
  iconSize,
  icon,
  children,
  type,
  href,
  className,
  onClick,
  htmlType,
}: ButtonProps) => {
  let iconComponent

  const iSize = iconSize ?? DEFAULT_ICON_SIZE
  if (icon) {
    iconComponent = <IconProvider value={{size: iSize}}>{icon}</IconProvider>
  }

  const classTypes = []
  if (type === 'primary') {
    classTypes.push('bg-blue-500')
    classTypes.push('text-blue-100')
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

  const component = href
    ? createElement(Link, {href})
    : createElement('button', {
        type: htmlType ?? 'button',
      })

  return cloneElement(
    component as any,
    {
      className: classname([
        'font-bold text-[14px] text-white/80',
        'inline-flex gap-[1.3rem] items-center',
        'py-[1.3rem] px-[3rem] rounded-[5rem]',
        'border border-slate-50/25',
        ...classTypes,
        className ?? '',
      ]),
      onClick,
    },
    iconComponent,
    label
  )
}
