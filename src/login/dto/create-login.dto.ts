import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoginDto {
    @IsString()
    @IsNotEmpty()
    fechaLogin: Date;
  
    @IsString()
    @IsNotEmpty()
    idUsuario: number;
}