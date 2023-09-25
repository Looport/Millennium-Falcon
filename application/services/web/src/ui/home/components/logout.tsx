'use client'

import {cloneElement, ReactElement} from 'react'

import {cleanToken} from '@/ui/auth/lib/token'
import {useRefreshPage} from '@/ui/common/hooks/refresh-page'

export const Logout = ({children}: {children: ReactElement}) => {
  const {refresh} = useRefreshPage()
  const logout = () => {
    cleanToken()

    refresh({redirectTo: '/'})
  }

  const onClick = () => {
    children.props.onClick?.()
    logout()
  }

  return cloneElement(children, {'aria-label': 'Logout', onClick})
}
