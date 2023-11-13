import {JoinFormVariantEnum} from '@/ui/auth/components/join-form'

export const getButtonLabel = (variant: JoinFormVariantEnum) => {
  if (variant === JoinFormVariantEnum.login) {
    return 'Login'
  }

  return 'Sign Up'
}
