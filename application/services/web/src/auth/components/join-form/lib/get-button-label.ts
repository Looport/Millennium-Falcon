import {JoinFormVariantEnum} from '@/auth/components/join-form/join-form'

export const getButtonLabel = (variant: JoinFormVariantEnum) => {
  if (variant === JoinFormVariantEnum.login) {
    return 'Login'
  }

  return 'Sign Up'
}
