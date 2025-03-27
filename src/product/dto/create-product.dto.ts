import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreateProductDto {

    @ApiProperty({
        description:'Nombre del producto',
        minLength: 3
    })    
    nameProduct: string;

    @ApiProperty({
        description:'Precio del producto',
        maxLength: 250
    })  
    price:number;

    @ApiProperty({
        description:'Descripción del paquete turístico',
        maxLength: 250
    })   
    typeProduct:string;
   
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
    nameProduct: string;

    @Expose()  
    price:number;

    @Expose() 
    typeProduct:string;
    
    @Expose()
    description: string;
    
    @Expose()
    isOferta: boolean;
  
    @Expose()
    porcntOferta: number;
  
    @Expose()  
    finalPrice:number;

  }