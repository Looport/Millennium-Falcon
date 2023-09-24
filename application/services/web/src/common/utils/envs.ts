enum Environment {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  LOCAL = 'local',
}

// __REPLACE__NEXT_PUBLIC_ENV__ -> replaces while deployment
const ENV = process.env.NEXT_PUBLIC_ENV ?? '__REPLACE__NEXT_PUBLIC_ENV__'

export const env = () => ENV

export const production = () => ENV === Environment.PRODUCTION

export const development = () => ENV === Environment.DEVELOPMENT

export const local = () => ENV === Environment.LOCAL
