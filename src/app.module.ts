import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path'
import { UsersModule } from './modules/users/user.module'
import { ProductsModule } from './modules/products/products.module'
import { OrdersModule } from './modules/orders/orders.module'
import { AuthModule } from './modules/auth/auth.module'
import { CartModule } from './modules/cart/cart.module'
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'giangvt23'),
        database: configService.get('DB_DATABASE', 'db_tmdt'),
        entities: [join(__dirname, '**', '*.entity.{js,ts}')],
        synchronize: configService.get('NODE_ENV') !== 'production',
        // dropSchema: true, // không nên bật lại khi đã hoàn thành database
      }),
    }),
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
    CartModule,
  ],
})
export class AppModule {}
