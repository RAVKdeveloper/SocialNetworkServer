import { IsNotEmpty } from "class-validator"

export class CreateGaleryClipsCommentDto {

    @IsNotEmpty()
    readonly text: string

    @IsNotEmpty()
    readonly clipId: number
}
