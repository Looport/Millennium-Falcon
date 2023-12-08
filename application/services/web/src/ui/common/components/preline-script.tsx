'use client'

import {usePathname} from 'next/navigation'
import {useEffect} from 'react'

export const PrelineScript = () => {
  const path = usePathname()

  useEffect(() => {
    import('preline/preline')
  }, [])

  /*
   * useEffect(() => {
   *   setTimeout(() => {
   *     window.HSStaticMethods.autoInit()
   *   }, 100)
   * }, [path])
   */

  return null
}
