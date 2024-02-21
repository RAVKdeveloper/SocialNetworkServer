import { IsNotEmpty } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  readonly userId: number;
}
