export class CreateTicketDto {
  readonly description: string;
  readonly taken?: number;
  readonly userId?: number;
}
