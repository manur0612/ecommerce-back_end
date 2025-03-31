import { Injectable, Logger } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(private readonly usuarioService: UsuarioService) {}

  async validateUser(usuario: string, password: string): Promise<any> {
    this.logger.debug(`Validando usuario: ${usuario} con contraseña: ${password}`);
    const user = await this.usuarioService.findByUsuario(usuario);
    //if (user && (await bcrypt.compare(password, user.password))) {
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
