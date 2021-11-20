import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class VerifyJwtPayloadService {
  constructor(private readonly prisma: PrismaService) {}

  public async execute(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...finedUser } = user;
    return finedUser;
  }
}
