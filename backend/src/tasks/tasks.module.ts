import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskController } from './controllers/tasks.controller';
import { CreateTaskService } from './services/create-task.service';
import { DeleteTaskService } from './services/delete-task.service';
import { DoneTaskService } from './services/done-task.service';
import { GetAllTasksService } from './services/get-all-tasks.service';
import { GetTaskByIdService } from './services/get-task-by-id.service';

@Module({
  controllers: [TaskController],
  providers: [
    GetAllTasksService,
    CreateTaskService,
    GetTaskByIdService,
    DeleteTaskService,
    DoneTaskService,
  ],
  imports: [PrismaModule],
})
export class TaskModule {}
