import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'

import { WallPost } from '../create-post/entities/create-post.entity';


@Injectable()
export class OptionsPostService {

  constructor(@InjectRepository(WallPost) private postRepo: Repository<WallPost>) {}

  async updateComments(postId: number, userId: number, isComments: boolean) {
     await this.postRepo.update({ id: postId, user: { id: userId } }, { isComments })

     return { message: 'succes' }
  }

}
