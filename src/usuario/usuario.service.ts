import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto, UsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {UsuarioEntity } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<UsuarioEntity> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, salt);
    const newUser = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });
    return this.usuarioRepository.save(newUser);
  }

  async findOne(id_usuario: number): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findOne({ where: { id_usuario } });
  }

  async findByUsuario(usuario: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findOne({ where: { usuario } });
  }

  async findAll(): Promise<UsuarioDto[]> {
    try {
          const usuario = await this.usuarioRepository.find({
            where: { rol: 'Cliente' },
          });
      
          return plainToInstance(UsuarioDto, usuario, {
            excludeExtraneousValues: true,
          });
        } catch (error) {
          // Maneja el error apropiadamente, por ejemplo, registrándolo o lanzando una excepción personalizada
          throw new InternalServerErrorException('Error al obtener los productos');
        }
  }
  
  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
