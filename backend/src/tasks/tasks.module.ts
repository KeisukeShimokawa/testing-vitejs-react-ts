import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskController } from './controllers/tasks.controller';
import { CreateTaskService } from './services/create-task.service';
import { GetAllTasksService } from './services/get-all-tasks.service';

@Module({
  controllers: [TaskController],
  providers: [GetAllTasksService, CreateTaskService],
  imports: [PrismaModule],
})
export class TaskModule {}
