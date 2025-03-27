import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto, ProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(ProductEntity)
   private readonly productRepository: Repository<ProductEntity>,
  ){}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {

    const { finalPrice, porcentajeOferta } = createProductDto;

    if (createProductDto.isOferta) {
      const finalPrice = createProductDto.price * (porcentajeOferta / 100); 
    } else {
      createProductDto.finalPrice = createProductDto.price;
    }      

    const nuevoProducto = this.productRepository.create({
      ...createProductDto,
      finalPrice,
    });  
    return await this.productRepository.save(nuevoProducto);
  }

   getAllProducts(): Promise<ProductEntity[]> {
     return this.productRepository.find();
   }

   async findAll(): Promise<ProductDto[]> {
    try {
      const products = await this.productRepository.find({
        where: { active: true },
      });
  
      return plainToInstance(ProductDto, products, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      // Maneja el error apropiadamente, por ejemplo, registrándolo o lanzando una excepción personalizada
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }

  async findOne(id: number): Promise<ProductEntity> {
    const producto = await this.productRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    
    if (!producto) {
      throw new NotFoundException(`Producto with ID ${id} not found`);
    }
    
    return producto;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const producto = await this.productRepository.findOne({ where: { id } });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  
    // Validación adicional: asegurarse de que 'price' y 'porcentajeOferta' sean positivos
    if (updateProductDto.price !== undefined && updateProductDto.price < 0) {
      throw new BadRequestException('El precio no puede ser negativo');
    }
    if (updateProductDto.porcentajeOferta !== undefined && (updateProductDto.porcentajeOferta < 0 || updateProductDto.porcentajeOferta > 100)) {
      throw new BadRequestException('El porcentaje de oferta debe estar entre 0 y 100');
    }
  
    this.productRepository.merge(producto, updateProductDto);
    return await this.productRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productRepository.remove(producto);
  }
}
