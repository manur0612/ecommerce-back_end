import { Expose } from "class-transformer";

export class CreateUsuarioDto {
    nombre: string;
    apellido: string;
    usuario: string;
    password: string;
    fec_naci: Date;
    rol: string;
}
export class UsuarioDto {
    @Expose() 
    nombre: string;

    @Expose() 
    apellido: string;
    
    @Expose() 
    usuario: string;
    
    @Expose() 
    password: string;
    
    @Expose() 
    fec_naci: Date;
    
    @Expose() 
    rol: string;
}