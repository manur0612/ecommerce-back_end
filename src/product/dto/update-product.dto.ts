import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsUrl()
    imgUrl?: string;
  
    @IsOptional()
    @IsBoolean()
    isOferta?: boolean;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    porcentajeOferta?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    finalPrice?: number;
  
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
