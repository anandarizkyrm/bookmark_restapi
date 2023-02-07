import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
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
  loginUser(@Body() dto: AuthDto, @Res() res) {
    // Set the "http only" cookie after successful login

    // res.status(HttpStatus.OK).send({
    //   message: 'success login',
    // });
    // console.log(this.authService.loginUser(dto));
    return this.authService.loginUser(dto, res);
    // Return success status
  }
}
