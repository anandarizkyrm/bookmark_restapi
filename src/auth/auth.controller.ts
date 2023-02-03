import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  createUser(@Body() dto: AuthDto) {
    return this.authService.createUser(dto);
  }

  @Post('signin')
  loginUser(@Body() dto: AuthDto) {
    return this.authService.loginUser(dto);
  }
}
