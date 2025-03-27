import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() createLoginDto: CreateLoginDto) {
    const user = await this.loginService.validateUser(createLoginDto.usuario, createLoginDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    // Aquí podrías generar y devolver un token JWT o una sesión
    return { message: 'Inicio de sesión exitoso', user };
  }
}
