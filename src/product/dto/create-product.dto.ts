import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description:'Nombre del producto',
        minLength: 3
    })
    @IsNotEmpty()    
    nameProduct: string;

    @ApiProperty({
        description:'Precio del producto',
        maxLength: 250
    }) 
    @IsPositive() 
    @IsNotEmpty()  
    price:number;

    @ApiProperty({
        description:'Descripción del paquete turístico',
        maxLength: 250
    })
    @IsNotEmpty() 
    description: string;
      
    isOferta: boolean;
  
    porcentajeOferta: number;

    @ApiProperty({
        description:'Precio final, incluyendo el porcentaje de descuento',
        maxLength: 250
    })   
    finalPrice:number;

    activo: boolean;

}

export class ProductDto {
  
    @Expose() 
    name: string;

    @Expose()  
    price:number;
   
    @Expose()
    description: string;

    @Expose()
    imgUrl: string;
    
    @Expose()
    isOferta: boolean;
  
    @Expose()
    porcntOferta: number;
  
    @Expose()  
    finalPrice:number;

  }