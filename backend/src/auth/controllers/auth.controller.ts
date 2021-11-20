import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { AccessTokenInterceptor } from '../interceptors/access-token.interceptor';
import { RegisterUserService } from '../services/register-user.service';
import { RegisterUserDTO } from './request/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerUser: RegisterUserService) {}

  @Post('signup')
  @UseInterceptors(AccessTokenInterceptor)
  async signup(@Body() body: RegisterUserDTO) {
    return await this.registerUser.execute(body);
  }

  @Post('signin')
  signin() {
    return 'signin';
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
