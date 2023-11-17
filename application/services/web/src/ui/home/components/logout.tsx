'use client'

import {cloneElement, ReactElement} from 'react'

import {cleanClientToken} from '@/ui/auth/lib/token.client'
import {useRefreshPage} from '@/ui/common/hooks/refresh-page'

export const Logout = ({children}: {children: ReactElement}) => {
  const {refresh} = useRefreshPage()
  const logout = () => {
    cleanClientToken()

    refresh({redirectTo: '/'})
  }

  const onClick = () => {
    children.props.onClick?.()
    logout()
  }

  return cloneElement(children, {'aria-label': 'Logout', onClick})
}
