import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WallPostLike } from './entities/wall-post-like.entity';

@Injectable()
export class WallPostLikesService {
  constructor(
    @InjectRepository(WallPostLike) private likesRepo: Repository<WallPostLike>,
  ) {}

  create(postId: number, userId: number) {
    return this.likesRepo.save({
      post: { id: postId },
      user: { id: userId },
      filterUserId: userId,
    });
  }

  remove(id: number, userId: number) {
    return this.likesRepo.delete({ post: { id }, filterUserId: userId });
  }
}
