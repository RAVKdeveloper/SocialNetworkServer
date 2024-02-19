import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GaleryPhotoLike } from './entities/galery-photo-like.entity';

@Injectable()
export class GaleryPhotoLikesService {
  constructor(
    @InjectRepository(GaleryPhotoLike)
    private likesRepo: Repository<GaleryPhotoLike>,
  ) {}

  async create(userId: number, photoId: number) {
    const newLike = await this.likesRepo.save({
      user: { id: userId },
      photo: { id: photoId },
    });

    return { thisUserLike: true };
  }

  async findOne(userId: number, photoId: number) {
    const like = await this.likesRepo.find({
      relations: {
        user: true,
        photo: true,
      },
      where: { user: { id: userId }, photo: { id: photoId } },
    });

    if (like.length === 0) return { thisUserLike: false };

    return { thisUserLike: true };
  }

  async remove(photoId: number) {
    const { id } = await this.likesRepo.findOne({
      relations: { photo: true },
      where: { photo: { id: photoId } },
    });

    await this.likesRepo.delete(id);

    return { thisUserLike: false };
  }
}
