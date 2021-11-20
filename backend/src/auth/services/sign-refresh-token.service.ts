import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../interfaces/auth-user.interface';

@Injectable()
export class SignRefreshTokenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async execute(user: AuthUser) {
    const payload = { sub: user.id };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    const credentials = await this.prisma.credential.upsert({
      where: { userId: user.id },
      update: { refreshToken: refreshToken },
      create: { userId: user.id, refreshToken: refreshToken },
    });

    return credentials.refreshToken;
  }
}
