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
import { SignRefreshTokenService } from '../services/sign-refresh-token.service';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService,
    private readonly signRefreshJwt: SignRefreshTokenService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<AuthUser>,
  ): Observable<Promise<AuthUser>> {
    return next.handle().pipe(
      map(async (user) => {
        const response = context.switchToHttp().getResponse<Response>();
        const refreshToken = await this.signRefreshJwt.execute(user);

        response.cookie('refresh_token', refreshToken, {
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
