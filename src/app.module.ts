import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ProductModule } from './product/product.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [LoginModule, ProductModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
