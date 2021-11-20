import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { GetAllTasksService } from '../services/get-all-tasks.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly getAllTasksService: GetAllTasksService) {}

  @Get()
  getAllTasks() {
    return this.getAllTasksService.execute();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTask() {
    return 'create';
  }

  @Get('/:taskId')
  getTask() {
    return 'task';
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
