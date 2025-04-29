import 'dotenv/config'

export const PORT = process.argv.slice(2)[0] || process.env.PORT
export const ENVIRONMENT = process.env.NODE_ENV
export const SWAGGER_URL = process.env.SWAGGER_URL || 'http://localhost:4000'
