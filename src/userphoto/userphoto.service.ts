import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoUser } from './entitys/photo.entity';

@Injectable()
export class PhotoUserService {
  constructor(
    @InjectRepository(PhotoUser) private photoRepo: Repository<PhotoUser>,
  ) {}

  async createPhoto(req: any, file: any) {
    const photo = this.photoRepo.save({
      photo: file.filename,
      user: { id: req.user.sub },
    });

    return photo;
  }

  async getPhotos(userId: number) {
    const photos = await this.photoRepo.find({
      relations: {
        user: true,
        likesPhoto: true,
      },
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });

    return photos;
  }

  async getPreviewPhoto(userId: number) {
    const photos = await this.photoRepo.find({
      relations: {
        user: true,
        likesPhoto: true,
      },
      where: { user: { id: userId } },
      take: 3,
      order: { id: 'DESC' },
    });

    return photos;
  }

  async getOnePhoto(id: number) {
    const photo = await this.photoRepo.findOne({
      relations: {
        likesPhoto: true,
        user: true,
      },
      where: { id },
    });

    if (!photo)
      throw new HttpException('Фото не найденно', HttpStatus.NOT_FOUND);

    return photo;
  }

  async deletePhotos(id: number) {
    const photo = await this.photoRepo.findOne({
      relations: {
        commentsPhoto: true,
        likesPhoto: true,
        user: true,
      },
      where: { id },
    });

    if (!photo)
      throw new HttpException('Фото не найдено', HttpStatus.NOT_FOUND);

    await this.photoRepo.delete({ id });
    const file = path.join(__dirname, `../../uploads/userPhoto/${photo.photo}`);
    fs.unlink(file, (err) => console.log(err));
    return { delete: true };
  }
}
