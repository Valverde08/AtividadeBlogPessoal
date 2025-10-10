import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common/decorators';
import { Usuario } from './entities/usuario.entity';
import { forwardRef } from '@nestjs/common/utils';
import { AuthModule } from '../auth/auth.module';
import { UsuarioService } from './services/usuario.service';
import { UsuarioController } from './controllers/usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule {}
