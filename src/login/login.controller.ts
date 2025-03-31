import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UsuarioDto } from 'src/usuario/dto/create-usuario.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() usuarioDto: UsuarioDto) {
    const { usuario, password } = usuarioDto;
    const user = await this.loginService.validateUser(usuario, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    // Aquí podrías generar y devolver un token JWT o una sesión
    return { message: 'Inicio de sesión exitoso', user };
  }
}
