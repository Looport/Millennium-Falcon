'use client'

import {login} from '@/network/passport/requests/login.request'
import {register} from '@/network/passport/requests/register.request'
import {JoinForm, JoinFormVariantEnum} from '@/ui/auth/components/join-form'
import {setToken} from '@/ui/auth/lib/token'
import {useRefreshPage} from '@/ui/common/hooks/refresh-page'

export const JoinContainer = () => {
  const {refresh} = useRefreshPage()

  const submit = async (data: any, variant: JoinFormVariantEnum) => {
    const action = getSubmitAction(variant)
    await action(data)

    refresh({redirectTo: '/'})
  }

  return <JoinForm onSubmit={submit} />
}

const getSubmitAction = (variant: JoinFormVariantEnum) => {
  const action = {login, register}[variant]

  return async function submit (data: any) {
    const body = await action(data)

    setToken(body.accessToken)

    return body
  }
}
