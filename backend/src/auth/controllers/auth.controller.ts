import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local.guard';
import { AccessTokenInterceptor } from '../interceptors/access-token.interceptor';
import { RefreshTokenInterceptor } from '../interceptors/refresh-token.interceptor';
import { AuthUser } from '../interfaces/auth-user.interface';
import { RegisterUserService } from '../services/signup-user.service';
import { RemoveRefreshToken } from '../services/remove-refresh-token.service';
import { RegisterUserDTO } from './request/signup-user.dto';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserService,
    private readonly removeRefreshToken: RemoveRefreshToken,
  ) {}

  @Post('signup')
  @UseInterceptors(AccessTokenInterceptor)
  @UseInterceptors(RefreshTokenInterceptor)
  async signup(@Body() body: RegisterUserDTO): Promise<AuthUser> {
    const user = await this.registerUser.execute(body);
    return user;
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(AccessTokenInterceptor)
  @UseInterceptors(RefreshTokenInterceptor)
  signin(@CurrentUser() user: AuthUser): AuthUser {
    return user;
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async signout(@CurrentUser() user: AuthUser, @Res() res: Response) {
    await this.removeRefreshToken.execute(user);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.send();
  }

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(AccessTokenInterceptor)
  refresh(@CurrentUser() user: AuthUser) {
    return user;
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthUser) {
    return user;
  }
}
