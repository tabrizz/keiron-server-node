import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from '../users/user.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({
    message: 'La descripción es requerida',
  })
  description: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  taken: number;

  @Column({ nullable: true })
  userId: number;
  @ManyToOne(
    type => User,
    user => user.tickets,
  )
  user: User;
}
