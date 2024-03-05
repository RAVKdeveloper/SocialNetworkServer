import { IsNotEmpty } from 'class-validator';

export class WallPreviewFriendsPreviewDto {
  @IsNotEmpty()
  readonly city: string;

  @IsNotEmpty()
  readonly limit: number;
}
