import { Injectable } from '@nestjs/common';
import { CreateGaleryClipsCommentDto } from './dto/create-galery-clips-comment.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { GaleryClipsComment } from './entities/galery-clips-comment.entity';


@Injectable()
export class GaleryClipsCommentsService {

  constructor(@InjectRepository(GaleryClipsComment) private commentRepo: Repository<GaleryClipsComment>) {}

  create(dto: CreateGaleryClipsCommentDto, userId: number) {
    return this.commentRepo.save({ text: dto.text, clip: { id: dto.clipId }, user: { id: userId } })
  }

  findAll(clipId: number) {
    return this.commentRepo.find({ relations: {
       user: true,
       clip: true
    }, where: { clip: { id: clipId } } })
  }

  remove(id: number) {
    return this.commentRepo.delete({ id })
  }
}
