import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['tickets'] });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail(id, { relations: ['tickets'] });
  }
  findAuth(email: string): Promise<User> {
    return this.usersRepository.findOneOrFail({ where: { email } });
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.findOneOrFail(id);

    const { id: userId, email, ...user } = updateUserDto;
    await this.usersRepository.update({ id: +id }, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
