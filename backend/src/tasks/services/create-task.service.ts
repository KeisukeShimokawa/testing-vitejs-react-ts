import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDTO } from '../controllers/request/create-task.dto';

@Injectable()
export class CreateTaskService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(taskData: CreateTaskDTO, userId: string) {
    const task = await this.prisma.task.create({
      data: {
        id: nanoid(),
        title: taskData.title,
        content: taskData.content,
        expires: taskData.expires,
        done: false,
        userId: userId,
      },
    });

    return task;
  }
}
