import { IsNotEmpty } from "class-validator"

export class UpdateClipDto {

    readonly preview: string

    readonly description: string

    @IsNotEmpty()
    readonly isComments: boolean

    @IsNotEmpty()
    readonly visible: string

    @IsNotEmpty()
    readonly confirm: boolean
} 