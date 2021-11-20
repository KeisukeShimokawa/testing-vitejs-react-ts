import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DeleteTaskService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(taskId: string, userId: string) {
    const fetchedTask = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (fetchedTask.userId !== userId) {
      throw new BadRequestException('所有者しか削除できません。');
    }

    const task = await this.prisma.task.delete({ where: { id: taskId } });

    return task;
  }
}
