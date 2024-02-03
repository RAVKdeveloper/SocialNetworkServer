import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

import { GaleryClip } from './entities/galery-clip.entity';
import { UpdateClipDto } from './dto/update-clip.dto';


@Injectable()
export class GaleryClipsService {

  constructor(@InjectRepository(GaleryClip) private clipRepo: Repository<GaleryClip>) {}

  create(videoName: string, userId: number) {
      return this.clipRepo.save({ video: videoName, user: { id: userId } })
  }

  async getPreview(userId: number) {
      const clips = await this.clipRepo.find({ relations: {
        user: true
      }, where: { user: { id: userId }, confirm: true }, take: 3, skip: 0, cache: true, order: { id: 'DESC' } })

      return clips
  }

  findAll(id: number) {
    return this.clipRepo.find({ relations: {
      user: true
    }, where: { user: { id }, confirm: true } })
  }

  async findOne(id: number) {
    const clip = await this.clipRepo.findOne({ relations: {
      user: true
    }, where: { id } })

    clip.views = clip.views + 1
    await this.clipRepo.save(clip)

    return clip
  }

  async remove(id: number) {
     const video = await this.clipRepo.findOne({ where: { id } })

     if(!video) throw new HttpException('Фото не найденно', HttpStatus.NOT_FOUND)

     const file = path.join(__dirname, `../../uploads/userClips/${video.video}`)
     fs.unlink(file, err => { return err })

     return this.clipRepo.delete(id)
  }

  async updateClip(id: number, dto: UpdateClipDto) {
     const clip = await this.clipRepo.findOne({ where: { id } })
     clip.preview = dto.preview
     clip.description = dto.description
     clip.isComments = dto.isComments
     clip.visible = dto.visible
     clip.confirm = dto.confirm
     clip.views = 0

     return this.clipRepo.save(clip)
  }

}
 