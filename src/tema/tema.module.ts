import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tema } from './entities/tema.entitiy';
import { TemaController } from './controller/tema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tema])],
  providers: [],
  controllers: [],
  exports: [],
})
export class TemaModule {}
