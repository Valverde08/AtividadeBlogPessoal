import { Postagem } from './../entities/postagem.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private PostagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    return await this.PostagemRepository.find();
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.PostagemRepository.findOne({
      where: {
        id,
      },
    });

    if (!postagem)
      throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

    return postagem;
  }

  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.PostagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    return await this.PostagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);

    return await this.PostagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.PostagemRepository.delete(id);
  }
}
