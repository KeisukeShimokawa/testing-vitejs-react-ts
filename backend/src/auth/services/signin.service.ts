import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUserService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(email: string, plainTextPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException(
        'メールアドレスに該当するユーザーが存在しません。',
      );
    }

    const isMatch = await bcrypt.compare(plainTextPassword, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('パスワードが一致しません。');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...findedUser } = user;

    return findedUser;
  }
}
