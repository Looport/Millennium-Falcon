import {development} from '@/common/utils/envs'

// __REPLACE__NEXT_PUBLIC_API_HOST__ -> replaces while starting the application
export const API_HOST =
  process.env.NEXT_PUBLIC_API_HOST ?? '__REPLACE__NEXT_PUBLIC_API_HOST__'

export const INGRESS_API_URL =
  'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'

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
