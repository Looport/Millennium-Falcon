import {useRouter} from 'next/navigation'
import {useCallback} from 'react'

export const useRefreshPage = () => {
  const router = useRouter()

  const refresh = useCallback(
    ({redirectTo}: {redirectTo?: string} = {}) => {
      /**
       * Warning
       * In another sequence of calls
       * will not redirect to the page
       */
      router.refresh()
      if (redirectTo) {
        router.push(redirectTo)
      }
    },
    [router]
  )

  return {
    refresh,
  }
}
