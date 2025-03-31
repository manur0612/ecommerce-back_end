import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateSaleDto {
     @IsNotEmpty() 
    idProducts: number;

     @IsNotEmpty() 
    idUsuario: number;

     @IsNotEmpty() 
    precioVenta: number;

     @IsNotEmpty() 
    fechaReserva?: Date;

     @IsNotEmpty() 
    nombrePasajero: string;
}


export class SaleDto {  
    @Expose() 
    idProducts: number;

     @Expose() 
    idUsuario: number;

     @Expose() 
    precioVenta: number;

     @Expose() 
    fechaReserva?: Date;

     @Expose() 
    nombrePasajero: string;
  }