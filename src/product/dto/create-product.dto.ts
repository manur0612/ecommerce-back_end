import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {

    @ApiProperty({
        description:'Nombre del producto',
        type: String,
        minLength: 3
    })
    nameProduct: string;
    @ApiProperty({
        description:'Descripción del paquete turístico',
        type: String,
        maxLength: 250
    })
    typeProduct:String;
    description: String;
    isOferta: boolean;
    porcntOferta: number;
    @ApiProperty({
        description:'Precio del paquete turístico',
        type: Number,
        maxLength: 250
    })
    price:number;

}
