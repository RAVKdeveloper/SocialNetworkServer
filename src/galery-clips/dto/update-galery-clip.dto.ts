import { PartialType } from '@nestjs/mapped-types';
import { CreateGaleryClipDto } from './create-galery-clip.dto';

export class UpdateGaleryClipDto extends PartialType(CreateGaleryClipDto) {}
