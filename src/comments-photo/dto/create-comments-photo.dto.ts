import { IsNotEmpty } from 'class-validator';

export class CreateCommentsPhotoDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  readonly photo: number;
}
