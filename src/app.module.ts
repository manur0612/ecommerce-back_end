import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ProductModule } from './product/product.module';
import { SalesModule } from './sales/sales.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product/entities/product.entity';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
     // ssl: { rejectUnauthorized: false },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false , // Cambiar a false en producción
      retryAttempts: 2,
      retryDelay: 1000,
      connectTimeoutMS: 5000,
      logging: true,
    }),
    TypeOrmModule.forFeature([ProductEntity]),
    LoginModule, ProductModule, SalesModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
