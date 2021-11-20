import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthUser } from '../interfaces/auth-user.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof AuthUser, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user as AuthUser;
  },
);
