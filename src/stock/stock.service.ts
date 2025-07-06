import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockDto, StockEntity, StockParams } from './DTOs/stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepo: Repository<StockEntity>,
  ) {}

  async findAllFiltered(params: StockParams): Promise<StockEntity[]> {
    const query = this.stockRepo.createQueryBuilder('stock');

    if (params.title?.trim()) {
      query.andWhere('stock.title ILIKE :title', {
        title: `%${params.title.trim()}%`,
      });
    }

    if (params.size?.trim()) {
      query.andWhere('stock.size ILIKE :size', {
        size: `%${params.size.trim()}%`,
      });
    }

    if (params.status?.trim()) {
      query.andWhere('stock.status = :status', {
        status: params.status.trim(),
      });
    }

    if (params.type?.trim()) {
      query.andWhere('stock.type = :type', {
        type: params.type.trim(),
      });
    }

    if (params.minPrice !== undefined) {
      query.andWhere('stock.price >= :minPrice', {
        minPrice: params.minPrice * 100,
      });
    }

    if (params.maxPrice !== undefined) {
      query.andWhere('stock.price <= :maxPrice', {
        maxPrice: params.maxPrice * 100,
      });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<StockEntity | null> {
    return this.stockRepo.findOne({ where: { id } });
  }

  async create(dto: StockDto): Promise<StockEntity> {
    const stock = this.stockRepo.create({
      ...dto,
      price: Math.round(dto.price * 100), // reais -> centavos
    });

    return this.stockRepo.save(stock);
  }

  async update(id: string, dto: StockDto): Promise<StockEntity> {
    const item = await this.findOne(id);
    if (!item) throw new NotFoundException('Item não encontrado');

    const updated = this.stockRepo.merge(item, {
      ...dto,
      price: dto.price !== undefined ? Math.round(dto.price * 100) : item.price,
    });

    return this.stockRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.stockRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Item não encontrado');
    }
  }
}
