import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
  ) {}

  findAll(): Promise<Ticket[]> {
    return this.ticketsRepository.find({ relations: ['user'] });
  }

  findOne(id: number): Promise<Ticket> {
    return this.ticketsRepository.findOneOrFail(id, { relations: ['user'] });
  }

  async create(ticket: CreateTicketDto): Promise<Ticket> {
    return await this.ticketsRepository.save(ticket);
  }

  async update(id: number, ticket: CreateTicketDto): Promise<void> {
    await this.ticketsRepository.findOneOrFail(id);
    await this.ticketsRepository.update(id, ticket);
  }

  async remove(id: number): Promise<void> {
    await this.ticketsRepository.delete(id);
  }

  async findByUser(id: number): Promise<Ticket[]> {
    return await this.ticketsRepository.find({ where: { userId: id } });
  }
}
