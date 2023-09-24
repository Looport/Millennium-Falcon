import {development} from '@/common/utils/envs'
import {API_HOST, INGRESS_API_URL} from '@/network/common/envs'

export const getApiUrl = () => {
  if (typeof window === 'undefined' && development()) {
    return `${INGRESS_API_URL}/api`
  }

  return `http://${API_HOST}/api`
}
