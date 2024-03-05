import { IsNotEmpty } from 'class-validator';

export class AcceptFriendsDto {
  @IsNotEmpty()
  readonly accepterId: number;
  @IsNotEmpty()
  readonly sendFromId: number;
  @IsNotEmpty()
  readonly id: number;
  @IsNotEmpty()
  readonly notificId: number;
}
