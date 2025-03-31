import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSaleDto, SaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleEntity } from './entities/sale.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SalesService {
    constructor(
    @InjectRepository(SaleEntity)
    private ventaRepository: Repository<SaleEntity>,
  ) {}

  async createVenta(createVentaDto: CreateSaleDto): Promise<SaleEntity> {
    const venta = this.ventaRepository.create(createVentaDto);
    return this.ventaRepository.save(venta);
  }

  // create(createSaleDto: CreateSaleDto) {
  //   return 'This action adds a new sale';
  // }

  async findAll(): Promise<SaleDto[]>  {
    try {
          const products = await this.ventaRepository.find({
           
          });
      
          return plainToInstance(SaleDto, products, {
            excludeExtraneousValues: true,
          });
        } catch (error) {
          // Maneja el error apropiadamente, por ejemplo, registrándolo o lanzando una excepción personalizada
          throw new InternalServerErrorException('Error al obtener los productos');
        }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} sale`;
  // }

  // update(id: number, updateSaleDto: UpdateSaleDto) {
  //   return `This action updates a #${id} sale`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sale`;
  // }
}
