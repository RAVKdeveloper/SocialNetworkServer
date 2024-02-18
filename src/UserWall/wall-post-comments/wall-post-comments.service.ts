import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import * as fs from 'fs'
import * as path from 'path'

import { WallPostComment } from './entities/wall-post-comment.entity';
import { CreateWallPostCommentDto } from './dto/create-wall-post-comment.dto';
import { UpdateWallPostCommentDto } from './dto/update-wall-post-comment.dto';


@Injectable()
export class WallPostCommentsService {

  constructor(@InjectRepository(WallPostComment) private commentsRepo: Repository<WallPostComment>) {}

  create(dto: CreateWallPostCommentDto, userId: number) {
    return this.commentsRepo.save({ 
      user: { id: userId },
      post: { id: dto.postId },
      answerRef: dto.answerRef,
      text: dto.text 
    })
  }

  uploadImage(userId: number, fileName: string, commentsId: number) {
        return this.commentsRepo.update({ id: commentsId, user: { id: userId } }, { imgUrl: fileName } )
  }

  findOne(id: number, order: 'ASC' | 'DESC') {
    return this.commentsRepo.find({ 
       relations: { user: true },
       where: { post: { id } },
       order: { id: order }
     })
  }

  async update(id: number, dto: UpdateWallPostCommentDto, userId: number) {
    return await this.commentsRepo.update({ id, user: { id: userId } }, { text: dto.text })
  }

  async remove(id: number, userId: number) {
    const { id: commentId, imgUrl } = await this.commentsRepo.findOne({ where: { id, user: { id: userId } } })

    if(imgUrl) this.deleteImage(imgUrl)

    return this.commentsRepo.delete({ id: commentId, user: { id: userId } })
  }

  async deleteImage(fileName: string) {
      if(!fileName) throw new BadRequestException({ message: 'Фото ненайдено'  })

      const file = path.join(__dirname, `../../../uploads/WallMedia/comments/${fileName}`)
      fs.unlink(file, err => console.log(err))

      return { message: 'Фото удалено' }
  }
}
