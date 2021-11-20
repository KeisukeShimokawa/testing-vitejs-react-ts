import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  @Get()
  getAllTasks() {
    return 'all';
  }

  @Post()
  createTask() {
    return 'create';
  }

  @Get('/:taskId')
  getTask() {
    return 'task';
  }

  @Patch('/:taskId')
  editTask() {
    return 'edit';
  }

  @Delete('/:taskId')
  deleteTask() {
    return 'delete';
  }
}
