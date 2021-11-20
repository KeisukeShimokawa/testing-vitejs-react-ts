import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthUser } from '../interfaces/auth-user.interface';
import { LoginUserService } from '../services/signin.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly login: LoginUserService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    console.log('LocalStrategy called ...');

    const user = await this.login.execute(email, password);
    return user;
  }
}
