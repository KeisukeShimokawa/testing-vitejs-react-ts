import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GetAllTasksService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute() {
    const tasks = await this.prisma.task.findMany({
      orderBy: { expires: 'asc' },
    });

    return tasks;
  }
}
