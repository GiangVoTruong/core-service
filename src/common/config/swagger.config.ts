import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions } from '@nestjs/swagger'
import { SWAGGER_URL } from './app.config'

export const swaggerOpptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
    tagsSorter: 'alpha',
    docExpansion: false,
  },
  useGlobalPrefix: false,
  customSiteTitle: 'E-Commerce API',
}

export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()

  .setTitle('E-Commerce API')
  .setDescription('API Documentation for E-Commerce Application')
  .setVersion('1.0')
  .addServer('/')
  .addServer('/api')
  .addBearerAuth()
  .addGlobalParameters({
    in: 'header',
    name: 'origin',
    schema: { type: 'string', default: SWAGGER_URL },
  })
  .build()
