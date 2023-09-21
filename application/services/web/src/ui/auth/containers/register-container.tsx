import {useRouter} from 'next/navigation'

import {register} from '@/network/auth/requests/register.request'
import {JoinForm} from '@/ui/auth/components/join-form'

export const RegisterContainer = () => {
  const router = useRouter()

  const submit = async (data: any) => {
    const body = await register(data)

    document.cookie = `accessToken=${body.accessToken};`

    router.push('/')
    router.refresh()
  }

  return <JoinForm onSubmit={submit} />
}
