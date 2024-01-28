import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentsPhotoDto } from './create-comments-photo.dto';

export class UpdateCommentsPhotoDto extends PartialType(CreateCommentsPhotoDto) {}
