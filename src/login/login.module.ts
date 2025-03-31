import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { LoginHistory } from './entities/login.entity';

@Module({
  
  imports: [
    UsuarioModule,
    TypeOrmModule.forFeature([UsuarioEntity, LoginHistory]),
      
  ], 
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
