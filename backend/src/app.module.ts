import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, TaskModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
