import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto, SaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaleEntity } from './entities/sale.entity';

@ApiTags('Sales api controller')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @ApiOperation({ summary: 'Create a new Sale' })
  @ApiBody({ type: CreateSaleDto })
  @ApiResponse({ status: 201, description: 'new Sale' })
  @Post()
  @UsePipes(ValidationPipe) 
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createVenta(createSaleDto);
  }

  @ApiOperation({ summary: 'List all Sales' })
  @ApiResponse({
      status: 200,
      description: 'List of Sales',
      type: [SaleDto],
    })
  @Get()
  findAll(): Promise<SaleDto[]> {
    return this.salesService.findAll();
  }

  @ApiOperation({ summary: 'Get Sales by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Sales details', 
      type: SaleEntity })  
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.salesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
  //   return this.salesService.update(+id, updateSaleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.salesService.remove(+id);
  // }
}
