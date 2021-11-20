import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from '../decorators/current-user.decorator';
import { LocalAuthGuard } from '../guards/loca.guard';
import { AccessTokenInterceptor } from '../interceptors/access-token.interceptor';
import { RefreshTokenInterceptor } from '../interceptors/refresh-token.interceptor';
import { AuthUser } from '../interfaces/auth-user.interface';
import { RegisterUserService } from '../services/register-user.service';
import { RegisterUserDTO } from './request/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUser: RegisterUserService) {}

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
    console.log(`[POST /auth/signin] called with ${user} ...`);
    return user;
  }

  @Post('signout')
  signout() {
    return 'signout';
  }

  @Get('refresh')
  refresh() {
    return 'refresh';
  }

  @Get('me')
  me() {
    return 'me';
  }
}
