'use client'

import {cleanToken} from '@/ui/auth/lib/token'
import {useRefreshPage} from '@/ui/common/hooks/refresh-page'

export const Logout = () => {
  const {refresh} = useRefreshPage()
  const logout = () => {
    cleanToken()

    refresh({redirectTo: '/'})
  }

  return <li onClick={logout}>Logout</li>
}
