enum Environment {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  LOCAL = 'local',
}

export const production = () => process.env.ENV === Environment.PRODUCTION

export const development = () =>
  process.env.ENV === Environment.DEVELOPMENT

export const local = () =>
  process.env.ENV === Environment.LOCAL
