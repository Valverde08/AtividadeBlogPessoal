import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private _usernameFiled: string;
  private _passwordField: string;

  constructor(private readonly authService: AuthService) {
    super();
    this._usernameFiled = 'usuario';
    this._passwordField = 'senha';
  }

  async validate(usuario: string, senha: string): Promise<any> {
    const validaUsuario = await this.authService.validateUser(usuario, senha);

    if (!validaUsuario) {
      throw new UnauthorizedException('Usuario e/ou senha incorretos');
    }
    return validaUsuario;
  }
}
