import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

import { CreateCommentsPhotoDto } from './dto/create-comments-photo.dto';
import { UpdateCommentsPhotoDto } from './dto/update-comments-photo.dto';
import { CommentsPhoto } from './entities/comments-photo.entity';

@Injectable()
export class CommentsPhotoService {

  constructor(@InjectRepository(CommentsPhoto) private commentsRepo: Repository<CommentsPhoto>) {}

  async create(createCommentsPhotoDto: CreateCommentsPhotoDto, userId: number) {
      const { text, photo } = createCommentsPhotoDto

      return this.commentsRepo.save({ text, user: { id: userId }, photo: { id: photo } })
  }

  getComments(photoId: number) {
    return this.commentsRepo.find({ 
      relations: {
        user: true,
        photo: true
      }, where: { photo: { id: photoId } }
     })
  }

  async update(id: number, dto: UpdateCommentsPhotoDto) {
       const comment = await this.commentsRepo.findOneBy({ id })

       comment.text = dto.text

       return this.commentsRepo.save(comment)
  }

  remove(id: number) {
    return this.commentsRepo.delete(id)
  }
}
 