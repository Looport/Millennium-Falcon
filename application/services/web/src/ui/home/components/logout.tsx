'use client'

import {useRefreshPage} from '@/ui/common/hooks/refresh-page'

export const Logout = () => {
  const {refresh} = useRefreshPage()
  const logout = () => {
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

    refresh({redirectTo: '/'})
  }

  return <li onClick={logout}>Logout</li>
}
