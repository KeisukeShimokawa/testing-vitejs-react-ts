import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthUser } from '../interfaces/auth-user.interface';

@Injectable()
export class RemoveRefreshToken {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(user: AuthUser) {
    await this.prisma.credential.delete({
      where: { userId: user.id },
    });
  }
}
