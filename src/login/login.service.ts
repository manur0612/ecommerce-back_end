import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async validateUser(usuario: string, password: string): Promise<any> {
    const user = await this.usuarioService.findByUsuario(usuario);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
