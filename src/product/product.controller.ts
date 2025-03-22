import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
    status: 500,
    description: 'Error',
    type: [CreateProductDto],
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
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Delete('sales/:id')
  deleteProductIfNoSales(@Param('id') id: string) {
    return 1;
  }


}
