import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get')
  getUser(@GetUser() user: User) {
    return {
      data: user,
    };
  }

  @Patch('edit')
  editUser(@GetUser('id') userId: number, @Body() dto: UserDto) {
    return this.userService.editUser(userId, dto);
  }
}
