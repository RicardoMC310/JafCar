import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './DTOs/stock.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockEntity])
  ],
  controllers: [StockController],
  providers: [StockService]
})
export class StockModule {}
