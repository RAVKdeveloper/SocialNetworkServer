import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GaleryClipsLike } from './entities/galery-clips-like.entity';

@Injectable()
export class GaleryClipsLikesService {
  constructor(
    @InjectRepository(GaleryClipsLike)
    private likesRepo: Repository<GaleryClipsLike>,
  ) {}

  create(clipId: number, userId: number) {
    return this.likesRepo.save({ user: { id: userId }, clip: { id: clipId } });
  }

  async findAll(clipId: number, userId: number) {
    const likes = await this.likesRepo.find({
      relations: {
        user: true,
        clip: true,
      },
      where: { clip: { id: clipId } },
    });

    let isLikeUser = false;

    likes.filter(({ user }) => {
      if (user.id === userId) isLikeUser = true;
    });

    return { likes, thisUserLike: isLikeUser };
  }

  async remove(id: number, userId: number) {
    const like = await this.likesRepo.findOne({
      relations: {
        user: true,
        clip: true,
      },
      where: { clip: { id }, user: { id: userId } },
    });

    return this.likesRepo.delete(like);
  }
}
