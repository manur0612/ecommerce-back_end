import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { SaleEntity } from './entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [    
    TypeOrmModule.forFeature([SaleEntity]),
  ],  
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
