import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Delete,
  Body,
  ParseUUIDPipe,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto, StockEntity, StockParams } from './DTOs/stock.dto';
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  async findAll(@Query() params: StockParams): Promise<StockEntity[]> {
    const stock = await this.stockService.findAllFiltered(params);
    return stock.map((item) => ({
      ...item,
      price: (item.price / 100), // converte centavos para reais
    }));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<StockEntity> {
    const item = await this.stockService.findOne(id);
    if (!item) throw new NotFoundException('Item não encontrado');

    return {
      ...item,
      price: item.price / 100,
    };
  }

  @Post()
  async create(@Body() dto: StockDto): Promise<StockEntity> {
    const item = await this.stockService.create(dto);
    return {
      ...item,
      price: item.price / 100,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: StockDto,
  ): Promise<StockEntity> {
    const item = await this.stockService.update(id, dto);
    return {
      ...item,
      price: item.price / 100,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.stockService.remove(id);
  }
}
