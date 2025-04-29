import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { swaggerConfig, swaggerOpptions } from './common/config/swagger.config'
import { ENVIRONMENT, PORT } from './common/config/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Cấu hình Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )

  // Cấu hình CORS
  app.enableCors()

  // Cấu hình API prefix
  app.setGlobalPrefix('api')

  // Cấu hình Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger', app, document, swaggerOpptions)

  // Khởi động server
  await app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} and environment ${ENVIRONMENT}`)
  })
}

bootstrap()
