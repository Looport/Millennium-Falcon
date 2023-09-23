'use client'

import {useRefreshPage} from '@/ui/common/hooks/refresh-page'
import {cleanToken} from "@/ui/auth/lib/token";

export const Logout = () => {
  const {refresh} = useRefreshPage()
  const logout = () => {
    cleanToken()

    refresh({redirectTo: '/'})
  }

  return <li onClick={logout}>Logout</li>
}
