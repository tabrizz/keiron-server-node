import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Exclude } from 'class-transformer';

import { Ticket } from '../tickets/ticket.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({
    message: 'El nombre es requerido.',
  })
  @MinLength(3, {
    message: 'El campo de nombre es muy corto.',
  })
  name: string;

  @Column()
  @IsEmail(undefined, {
    message: 'Debe ingresar un email válido.',
  })
  @IsNotEmpty({
    message: 'El email es requerido.',
  })
  email: string;

  @Column()
  @MinLength(6, {
    message: 'La contraseña debe tener 6 caracteres como mínimo.',
  })
  @MaxLength(11, {
    message: 'La contraseña debe tener 11 caracteres como máximo.',
  })
  @Exclude()
  password: string;

  @OneToMany(
    type => Ticket,
    ticket => ticket.user,
  )
  tickets: Ticket[];

  @Column({ nullable: true })
  typeUserId: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
