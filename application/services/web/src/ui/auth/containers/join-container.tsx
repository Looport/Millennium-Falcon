'use client'

import {login} from '@/network/passport/requests/login.request'
import {register} from '@/network/passport/requests/register.request'
import {JoinForm, JoinFormVariantEnum} from '@/ui/auth/components/join-form'
import {useRefreshPage} from '@/ui/common/hooks/refresh-page'
import {setToken} from "@/ui/auth/lib/token";

export const JoinContainer = () => {
  const {refresh} = useRefreshPage()

  const submit = async (data: any, variant: JoinFormVariantEnum) => {
    const action = {login, register}[variant]
    const body = await action(data)

    setToken(body.accessToken)

    refresh({redirectTo: '/'})
  }

  return <JoinForm onSubmit={submit} />
}
