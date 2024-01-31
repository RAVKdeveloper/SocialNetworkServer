import { Injectable } from '@nestjs/common';
import { CreateGaleryClipDto } from './dto/create-galery-clip.dto';
import { UpdateGaleryClipDto } from './dto/update-galery-clip.dto';

@Injectable()
export class GaleryClipsService {
  create(createGaleryClipDto: CreateGaleryClipDto) {
    return 'This action adds a new galeryClip';
  }

  findAll() {
    return `This action returns all galeryClips`;
  }

  findOne(id: number) {
    return `This action returns a #${id} galeryClip`;
  }

  update(id: number, updateGaleryClipDto: UpdateGaleryClipDto) {
    return `This action updates a #${id} galeryClip`;
  }

  remove(id: number) {
    return `This action removes a #${id} galeryClip`;
  }
}
