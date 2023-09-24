// __REPLACE__NEXT_PUBLIC_API_HOST__ -> replaces while deployment
export const API_HOST =
  process.env.NEXT_PUBLIC_API_HOST ?? '__REPLACE__NEXT_PUBLIC_API_HOST__'
export const INGRESS_API_URL =
  'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
