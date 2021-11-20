import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaErrorCode } from '../../prisma/prisma-error-code';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterUserDTO } from '../controllers/request/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(userData: RegisterUserDTO) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...userData,
          id: nanoid(),
          password: hashedPassword,
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...createdUser } = user;
      return createdUser;
    } catch (error) {
      if (error?.code === PrismaErrorCode.SQLITE_UNIQUE_CONSTRAINTS) {
        throw new BadRequestException('メールアドレスは既に使われています。');
      }
      throw new InternalServerErrorException();
    }
  }
}
