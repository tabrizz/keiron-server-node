import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  async findAll() {
    return await this.ticketsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.ticketsService.findOne(id);
  }

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    return await this.ticketsService.create(createTicketDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    await this.ticketsService.update(id, createTicketDto);
  }

  @Get('user/:id')
  async findByUser(@Param('id') id: number) {
    return await this.ticketsService.findByUser(id);
  }
}
