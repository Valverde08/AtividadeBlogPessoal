import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { ILike, Repository } from 'typeorm';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: {
        usuario: usuario,
      },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async finById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });
    if (!usuario)
      throw new HttpException('Usuário não encotrado', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async findUsuarioById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });

    if (!usuario)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    return usuario;
  }

  async findAllByNome(nome: string): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario)
      throw new HttpException('Usuario já existe!', HttpStatus.BAD_REQUEST);

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    await this.finById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);

    if (buscaUsuario && buscaUsuario.id !== usuario.id)
      throw new HttpException(
        'Usuário (e-mail) já cadstrado!',
        HttpStatus.BAD_REQUEST,
      );

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    return await this.usuarioRepository.save(usuario);
  }
}
