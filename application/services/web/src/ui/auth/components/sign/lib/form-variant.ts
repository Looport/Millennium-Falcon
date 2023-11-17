export enum FormVariant {
  login = 'login',
  register = 'register',
}

export const isLogin = (formVariant: FormVariant) =>
  formVariant === FormVariant.login
export const isRegister = (formVariant: FormVariant) =>
  formVariant === FormVariant.register

export const getSignFromVariantSearchQuery = (variant: FormVariant) =>
  new URLSearchParams({variant}).toString()
