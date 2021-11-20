import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './controllers/auth.controller';
import { RegisterUserService } from './services/register-user.service';

@Module({
  controllers: [AuthController],
  imports: [PrismaModule],
  providers: [RegisterUserService],
})
export class AuthModule {}
