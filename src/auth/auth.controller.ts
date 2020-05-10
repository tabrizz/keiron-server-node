import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authUserDto: AuthUserDto) {
    const user = await this.authService.validateUser(authUserDto.email);
    if (user !== null) {
      const { token } = await this.authService.login(authUserDto);
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          typeUserId: user.typeUserId,
        },
        token,
      };
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}
