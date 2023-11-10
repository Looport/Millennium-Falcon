import {API_HOST, INGRESS_API_URL} from '@/common/lib/request/envs'
import {development} from '@/common/utils/envs'

export const getApiUrl = () => {
  /**
   * When an application is running on local k8s,
   * we should use INGRESS_API_URL for SSR requests
   * because in can't access from local k8s to local /etc/hosts
   * and should use an internal k8s ingress link
   */
  if (typeof window === 'undefined' && development()) {
    return `${INGRESS_API_URL}/api`
  }

  return `http://${API_HOST}/api`
}
