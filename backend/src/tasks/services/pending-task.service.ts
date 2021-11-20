import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PendingTaskService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(taskId: string, userId: string) {
    const fetchedTask = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!fetchedTask) {
      throw new NotFoundException(`タスク { ${taskId} } が見つかりません。`);
    }

    if (fetchedTask.userId !== userId) {
      throw new ForbiddenException('所有者しかタスクを完了できません。');
    }

    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: { done: false },
    });

    return task;
  }
}
