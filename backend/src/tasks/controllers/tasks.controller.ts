import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthUser } from '../../auth/interfaces/auth-user.interface';
import { CreateTaskService } from '../services/create-task.service';
import { GetAllTasksService } from '../services/get-all-tasks.service';
import { GetTaskByIdService } from '../services/get-task-by-id.service';
import { CreateTaskDTO } from './request/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly getAllTasksService: GetAllTasksService,
    private readonly createTaskService: CreateTaskService,
    private readonly getTaskByIdService: GetTaskByIdService,
  ) {}

  @Get()
  getAllTasks() {
    return this.getAllTasksService.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTask(@Body() body: CreateTaskDTO, @CurrentUser() user: AuthUser) {
    return this.createTaskService.execute(body, user.id);
  }

  @Get('/:taskId')
  getTask(@Param('taskId') taskId: string) {
    console.log(taskId);
    return this.getTaskByIdService.execute(taskId);
  }

  @Patch('/:taskId')
  @UseGuards(JwtAuthGuard)
  editTask() {
    return 'edit';
  }

  @Delete('/:taskId')
  @UseGuards(JwtAuthGuard)
  deleteTask() {
    return 'delete';
  }
}
