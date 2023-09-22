'use client'


import {register} from '@/network/auth/requests/register.request'
import {JoinForm} from '@/ui/auth/components/join-form'
import {useRefreshPage} from "@/ui/common/hooks/refresh-page";

export const RegisterContainer = () => {
  const {refresh} = useRefreshPage()

  const submit = async (data: any) => {
    const body = await register(data)

    document.cookie = `accessToken=${body.accessToken};`

    refresh({redirectTo: '/'})
  }

  return <JoinForm onSubmit={submit} />
}
