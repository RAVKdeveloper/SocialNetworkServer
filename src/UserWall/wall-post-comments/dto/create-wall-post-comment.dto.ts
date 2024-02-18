import { IsNotEmpty } from "class-validator";

export class CreateWallPostCommentDto {

    readonly text: string

    @IsNotEmpty()
    readonly postId: number

    readonly answerRef: string

}
