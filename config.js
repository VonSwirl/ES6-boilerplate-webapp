function configURL (enviroment) {
  switch (enviroment) {
    case
      'development':
      return process.env.DB_DEVELOPMENT
      // return process.env.DB_PRODUCTION
    case
      'production':
      return process.env.DB_PRODUCTION
    case
      'test':
      return process.env.DB_DEVELOPMENT
    case
      'staging':
      return process.env.DB_STAGING
    case
      'deploy':
      return process.env.DB_PRODUCTION
    case
      'local':
      return process.env.DB_DEVELOPMENT
    default:
      return process.env.DB_DEVELOPMENT
  }
}

export default { configURL }
