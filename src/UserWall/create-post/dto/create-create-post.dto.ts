import { IsNotEmpty } from "class-validator"

export class CreateCreatePostDto {

    @IsNotEmpty()
    readonly text: string

    readonly contentMedia: string
    readonly typeContentMedia: string

    @IsNotEmpty()
    readonly isComments: boolean

    @IsNotEmpty()
    readonly visibleAction: string

    @IsNotEmpty()
    readonly isSendNotific: boolean
}
