import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './controllers/auth.controller';
import { LoginUserService } from './services/login.service';
import { RegisterUserService } from './services/register-user.service';
import { SignAccessTokenService } from './services/sign-access-token.service';
import { SignRefreshTokenService } from './services/sign-refresh-token.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    RegisterUserService,
    LoginUserService,
    SignAccessTokenService,
    SignRefreshTokenService,
    LocalStrategy,
  ],
  imports: [PrismaModule, ConfigModule, JwtModule.register({})],
})
export class AuthModule {}
