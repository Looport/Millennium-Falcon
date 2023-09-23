import {API_URL, INGRESS_API_URL} from '@/network/common/constants'

export const getApiUrl = () => {
  if (typeof window === 'undefined') {
    return INGRESS_API_URL
  }

  return API_URL
}
