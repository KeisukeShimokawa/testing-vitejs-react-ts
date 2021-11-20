import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup() {
    return 'signup';
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
