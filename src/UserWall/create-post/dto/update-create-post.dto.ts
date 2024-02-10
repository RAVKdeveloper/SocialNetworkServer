import { PartialType } from '@nestjs/mapped-types';
import { CreateCreatePostDto } from './create-create-post.dto';

export class UpdateCreatePostDto extends PartialType(CreateCreatePostDto) {}
