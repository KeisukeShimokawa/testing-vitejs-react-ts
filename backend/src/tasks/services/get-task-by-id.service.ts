import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GetTaskByIdService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(taskId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    return task;
  }
}
