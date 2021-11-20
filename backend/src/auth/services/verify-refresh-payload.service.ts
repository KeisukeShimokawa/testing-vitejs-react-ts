import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VerifyRefreshPayloadService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(refreshToken, userId) {
    const credentials = await this.prisma.credential.findUnique({
      where: { userId },
      include: {
        user: true,
      },
    });

    if (!credentials) {
      throw new UnauthorizedException('該当するユーザーが存在しません。');
    }

    const isRefreshTokenMatch = refreshToken === credentials.refreshToken;

    if (!isRefreshTokenMatch) {
      throw new UnauthorizedException('再ログインしてください。');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...matchedUser } = credentials.user;
    return matchedUser;
  }
}
