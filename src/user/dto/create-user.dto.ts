import { IsPhoneNumber } from 'class-validator';

export class CreateUserDTO {
  @IsPhoneNumber(undefined, { message: 'Неверная номер телефона' })
  readonly phone: string;

  readonly name: string;
  readonly middlename: string;
  readonly surname: string;
  readonly isBanned: boolean;
  readonly bannedStatus: string;
  readonly city: string;
  readonly avatar: string;
  readonly password: string;
  readonly birthday: string;
  readonly sex: string;
}
