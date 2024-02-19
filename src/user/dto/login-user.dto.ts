import { IsPhoneNumber } from 'class-validator';

export class LoginUserDto {
  @IsPhoneNumber(undefined, { message: 'Неверная номер телефона' })
  readonly phone: string;

  readonly password: string;
}
