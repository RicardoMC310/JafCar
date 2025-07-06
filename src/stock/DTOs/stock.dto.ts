import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum StockStatusEnum {
  DISPONIVEL = "disponível",
  INDISPONIVEL = "indisponível",
}

export enum StockTypeEnum {
  HIBRIDA = "híbrida",
  ESPECIFICA = "específica",
  SLIM = "slim",
  MULTIENCAIXE = "multi encaixe",
  MULTIENCAIXETRAS = "multi encaixe traseira",
  VCLEAR = "vclear",
  TRASEIRA = "traseira",
  TRASEIRAFER = "traseira ferro",
  TRASEIRAMULTI = "traseira multi encaixe",
  FERRO = "ferro",
  COMPRESSOR = "compressor",
  ASPIRADOR = "aspirador",
  AROMATIZANTE = "aromatizante",
}

@Entity("stock")
export class StockEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false })
  size: string;

  @Column({ type: "integer", nullable: false })
  price: number;

  @Column({
    type: "enum",
    enum: StockStatusEnum,
    nullable: false,
  })
  status: StockStatusEnum;

  @Column({
    type: "enum",
    enum: StockTypeEnum,
    nullable: false,
  })
  type: StockTypeEnum;
}

export class StockDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @Type(() => Number)
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsEnum(StockStatusEnum)
  status: StockStatusEnum;

  @IsNotEmpty()
  @IsEnum(StockTypeEnum)
  type: StockTypeEnum;

}

export interface StockParams {
  title?: string;
  size?: string;
  status?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
}

