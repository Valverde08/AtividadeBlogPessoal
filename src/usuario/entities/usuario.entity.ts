import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @Column({ length: 5000, nullable: true })
  @ApiProperty()
  foto: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({ length: 245, nullable: false })
  @ApiProperty({ example: 'email@email.com' })
  usuario: string;

  @MinLength(8)
  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @ApiProperty()
  @OneToMany(() => Postagem, (postagem) => postagem.usuario)
  postagem: Postagem[];
}
