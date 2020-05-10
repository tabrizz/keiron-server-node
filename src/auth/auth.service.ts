import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { AuthUserDto } from './auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findAuth(email);
    if (user) {
      return user;
    }
    return null;
  }

  async login(authUserDto: AuthUserDto) {
    return {
      token: this.jwtService.sign(authUserDto),
    };
  }
}
