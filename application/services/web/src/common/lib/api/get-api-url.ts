import {development} from '@/common/utils/envs'

// __REPLACE__NEXT_PUBLIC_API_HOST__ -> replaces while starting the application
export const API_HOST =
  process.env.NEXT_PUBLIC_API_HOST ?? '__REPLACE__NEXT_PUBLIC_API_HOST__'

export const INGRESS_API_URL =
  'ingress-nginx-controller.ingress-nginx.svc.cluster.local'

export const getApiUrl = () => {
  /**
   * When an application is running on a local machine inside k8s,
   * we should use INGRESS_API_URL for SSR requests.
   * This is because it can't access from k8s to local /etc/hosts
   * and doesn't go to the ingress inside container,
   * and should use an ingress internal service link
   */
  if (typeof window === 'undefined' && development()) {
    /**
     * Warning: Remember to pass headers with {host: API_HOST} during SSR,
     * to show target host inside ingress
     */
    return `http://${INGRESS_API_URL}/api`
  }

  return `http://${API_HOST}/api`
}

export const getServerAPIHostHeaders = () => {
  if (development()) {
    return {host: API_HOST}
  }

  return {}
}
