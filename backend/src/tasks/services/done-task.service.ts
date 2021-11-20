import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DoneTaskService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(taskId: string, userId: string) {
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: { done: true },
    });

    if (!task) {
      throw new NotFoundException(`タスク { ${taskId} } が見つかりません。`);
    }

    if (task.userId !== userId) {
      throw new ForbiddenException('所有者しかタスクを完了できません。');
    }

    return task;
  }
}
