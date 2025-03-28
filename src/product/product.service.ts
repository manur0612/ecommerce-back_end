import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto, ProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
   private readonly productRepository: Repository<ProductEntity>,
  ){}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const { price, isOferta, porcentajeOferta } = createProductDto;

    // Calcular el precio final basado en si hay una oferta
    const finalPrice = isOferta ? price * (1 - porcentajeOferta / 100) : price;
  
    // Crear una nueva instancia del producto con los datos proporcionados y el precio final calculado
    const nuevoProducto = this.productRepository.create({
      ...createProductDto,
      finalPrice,
    });
  
    // Guardar el nuevo producto en la base de datos y devolver la entidad guardada
    return await this.productRepository.save(nuevoProducto);
  }

   getAllProducts(): Promise<ProductEntity[]> {
     return this.productRepository.find();
     select: {
      name: true;
      imgUrl: true;
     }
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
      where: { id }
    });
    
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    
    return producto;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const producto = await this.productRepository.findOne({ where: { id } });
    
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  
    const { price, isOferta, porcentajeOferta } = updateProductDto;
    // Validación adicional: asegurarse de que 'price' y 'porcentajeOferta' sean positivos
    if (updateProductDto.price !== undefined && updateProductDto.price < 0) {
      throw new BadRequestException('El precio no puede ser negativo');
    }
    if (updateProductDto.porcentajeOferta !== undefined && (updateProductDto.porcentajeOferta < 0 || updateProductDto.porcentajeOferta > 100)) {
      throw new BadRequestException('El porcentaje de oferta debe estar entre 0 y 100');
    }
  
    let finalPrice = producto.finalPrice;
    if (price !== undefined || isOferta !== undefined || porcentajeOferta !== undefined) {
      const newPrice = price ?? producto.price;
      const newIsOferta = isOferta ?? producto.isOferta;
      const newPorcentajeOferta = porcentajeOferta ?? producto.porcentajeOferta;

      finalPrice = newIsOferta ? newPrice * (1 - newPorcentajeOferta / 100) : newPrice;
    }

    this.productRepository.merge(producto, { ...updateProductDto, finalPrice });
    return await this.productRepository.save(producto);
  }
  

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productRepository.remove(producto);
  }
}
