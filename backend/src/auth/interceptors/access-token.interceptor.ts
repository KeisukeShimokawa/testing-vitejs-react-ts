import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
import { AuthUser } from '../interfaces/auth-user.interface';
import { SignAccessTokenService } from '../services/sign-access-token.service';

@Injectable()
export class AccessTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly signJwt: SignAccessTokenService,
    private readonly configService: ConfigService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthUser>,
  ): Observable<AuthUser> {
    return next.handle().pipe(
      map((user) => {
        const response = context.switchToHttp().getResponse<Response>();
        const access_token = this.signJwt.execute(user);

        response.cookie('access_token', access_token, {
          httpOnly: true,
          signed: false,
          sameSite: 'strict',
          secure: this.configService.get('NODE_ENV') === 'production',
          maxAge:
            this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') * 1000,
        });

        return user;
      }),
    );
  }
}
