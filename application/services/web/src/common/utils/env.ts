enum Environment {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export const production = () => process.env.NODE_ENV === Environment.PRODUCTION

export const development = () =>
  process.env.NODE_ENV === Environment.DEVELOPMENT
