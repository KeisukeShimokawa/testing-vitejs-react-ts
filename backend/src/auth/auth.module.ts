import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './controllers/auth.controller';
import { LoginUserService } from './services/signin.service';
import { RegisterUserService } from './services/signup-user.service';
import { RemoveRefreshToken } from './services/remove-refresh-token.service';
import { SignAccessTokenService } from './services/sign-access-token.service';
import { SignRefreshTokenService } from './services/sign-refresh-token.service';
import { VerifyJwtPayloadService } from './services/verify-payload.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { VerifyRefreshPayloadService } from './services/verify-refresh-payload.service';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    RegisterUserService,
    LoginUserService,
    SignAccessTokenService,
    SignRefreshTokenService,
    RemoveRefreshToken,
    VerifyJwtPayloadService,
    VerifyRefreshPayloadService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  imports: [PrismaModule, ConfigModule, JwtModule.register({})],
})
export class AuthModule {}
