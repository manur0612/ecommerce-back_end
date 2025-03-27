import { IsNotEmpty, IsString } from "class-validator";

export class CreateLoginDto {
    @IsString()
    @IsNotEmpty()
    usuario: string;
  
    @IsString()
    @IsNotEmpty()
    password: string;
}
