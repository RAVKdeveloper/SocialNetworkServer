import { IsPhoneNumber } from "class-validator"

export class CheckPhoneDto{

    @IsPhoneNumber(undefined, { message: 'Передайте корректный номер телефона'})
    readonly phone: string
}