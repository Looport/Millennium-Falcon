'use client'

import {ReactNode} from 'react'
import {IconContext} from 'react-icons'

export const IconProvider = ({
  children,
  value,
}: {
  children: ReactNode
  value: IconContext
}) => <IconContext.Provider value={value}>{children}</IconContext.Provider>

export * from 'react-icons/ai'
export * from 'react-icons/bi'
export * from 'react-icons/fi'
export * from 'react-icons/lia'
export * from 'react-icons/bs'
export * from 'react-icons/tb'
export * from 'react-icons/lu'
export * from 'react-icons/hi'
export * from 'react-icons/vsc'
