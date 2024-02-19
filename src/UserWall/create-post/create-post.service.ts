import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { ILike } from 'typeorm';

import { WallPost } from './entities/create-post.entity';
import { CreateCreatePostDto } from './dto/create-create-post.dto';
import { QueryPostDto } from './dto/query-post.dto';

@Injectable()
export class CreatePostService {
  constructor(
    @InjectRepository(WallPost) private postRepo: Repository<WallPost>,
  ) {}

  create(dto: CreateCreatePostDto, userId: number) {
    return this.postRepo.save({
      ...dto,
      user: { id: userId },
    });
  }

  async findAll(query: QueryPostDto, userId: number) {
    if (query.action === 'all') {
      const posts = await this.postRepo.find({
        relations: {
          user: true,
          likes: true,
          comments: true,
        },
        where: { user: { id: userId } },
        take: +query.limit,
        skip: Number(+query.limit * (+query.page - 1)),
        order: { id: 'DESC' },
      });
      const count = await this.postRepo.countBy({ user: { id: userId } });

      return [posts, count];
    } else if (query.action === 'search') {
      return await this.postRepo.findAndCount({
        relations: { user: true, likes: true, comments: true },
        where: {
          user: { id: userId },
          text: ILike(`%${query.searchText.toLowerCase()}%`),
        },
        take: +query.limit,
        // skip: Number(+query.limit * (+query.page - 1)),
        order: { id: 'DESC' },
      });
    } else throw new BadRequestException('Не указан action запроса');
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne({
      relations: { user: true, likes: true, comments: true },
      where: { id },
    });

    if (!post) throw new NotFoundException('Медиа не найдено');

    post.visible += 1;

    return await this.postRepo.save(post);
  }

  async uploadMedia(userId: number, fileName: string, postId: number) {
    return await this.postRepo.update(
      { id: postId, user: { id: userId } },
      { contentMedia: fileName },
    );
  }

  async remove(id: number, userId: number) {
    const post = await this.postRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (post.contentMedia) {
      const file = path.join(
        __dirname,
        `../../../uploads/WallMedia/${post.contentMedia}`,
      );
      fs.unlink(file, (err) => console.log(err));
    }

    return this.postRepo.delete({ id });
  }

  async deleteMedia(id: number, userId: number) {
    const post = await this.postRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!post) throw new NotFoundException('Пост не найден');

    const file = path.join(
      __dirname,
      `../../../uploads/WallMedia/${post.contentMedia}`,
    );
    fs.unlink(file, (err) => console.log(err));

    await this.postRepo.update(
      { id, user: { id: userId } },
      { contentMedia: '', typeContentMedia: '' },
    );

    return { message: 'Медиафайл удалён' };
  }
}
