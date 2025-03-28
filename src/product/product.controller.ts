import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiTags,
  } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';

@ApiTags('Products api controller')
@Controller('v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Crea un servicio turístico' })
  @ApiResponse({
  status: 200,
  description: 'Nuevo servicio turístico',
  type: [CreateProductDto],
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {

    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  async  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto,
): Promise<ProductEntity>  {
  const updatedProduct = await this.productService.update(id, updateProductDto);
  if (!updatedProduct) {
    throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  }
  return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(+id)
    return "Producto borrado";
  }

  @Delete('sales/:id')
  deleteProductIfNoSales(@Param('id') id: string) {
    return 1;
  }


}
