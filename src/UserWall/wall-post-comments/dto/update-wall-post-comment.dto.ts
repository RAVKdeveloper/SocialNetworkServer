import { PartialType } from '@nestjs/mapped-types';
import { CreateWallPostCommentDto } from './create-wall-post-comment.dto';

export class UpdateWallPostCommentDto extends PartialType(CreateWallPostCommentDto) {}
