import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './controllers/auth.controller';
import { RegisterUserService } from './services/register-user.service';
import { SignAccessTokenService } from './services/sign-access-token.service';

@Module({
  controllers: [AuthController],
  providers: [
    RegisterUserService,
    SignAccessTokenService,
  ],
  imports: [PrismaModule, ConfigModule, JwtModule.register({})],
})
export class AuthModule {}
