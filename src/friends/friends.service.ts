import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoreThan, Not } from 'typeorm';

import { Friend } from './entities/friend.entity';
import { CreateFriendDto } from './dto/create-friend.dto';
import { AcceptFriendsDto } from './dto/accept-friend.dto';
import { NotificationService } from 'src/notification/notification.service';
import { WallPreviewFriendsPreviewDto } from './dto/wallPreview.dto';
import { User } from 'src/user/entitys/user.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend) private friendRepo: Repository<Friend>,
    private readonly notificService: NotificationService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async create(dto: CreateFriendDto, userId: number) {
    if (dto.userId !== userId) {
      const friend = await this.friendRepo.save({
        friend: { id: dto.userId },
        user: { id: userId },
      });
      await this.notificService.create(
        friend.user.id,
        friend.friend.id,
        friend.id,
      );
      return friend;
    }
    return new BadRequestException('Id юзера не должно совпадать с id друга');
  }

  async accept(dto: AcceptFriendsDto) {
    await this.friendRepo.update({ id: dto.id }, { status: true });
    await this.acceptFriendCreator(dto.accepterId, dto.sendFromId);
    await this.notificService.accept(
      dto.accepterId,
      dto.sendFromId,
      dto.notificId,
    );
    return {
      message: `Вы добавили поьзователя по id${dto.sendFromId} в друзья`,
    };
  }

  async findAll(userId: number) {
    return await this.friendRepo.findAndCount({
      relations: { friend: true },
      where: { user: { id: userId }, status: true },
      order: { friend: { followers: 'DESC' } },
    });
  }

  findOne(id: number) {
    return this.friendRepo.findOne({
      relations: { friend: true },
      where: { id },
    });
  }

  async findPreview(userId: number, limit: number) {
    const friends = await this.friendRepo.find({
      relations: { friend: true },
      where: { user: { id: userId }, status: true },
      order: { friend: { followers: 'DESC' } },
      take: limit,
    });
    const count = await this.friendRepo.findAndCount({
      where: { user: { id: userId }, status: true },
    });
    return [friends, count[1]];
  }

  async wallPreview(dto: WallPreviewFriendsPreviewDto, userId: number) {
    return this.userRepo.find({
      where: [
        { city: dto.city, id: Not(userId) },
        { followers: MoreThan(700), id: Not(userId) },
      ],
      order: { followers: 'DESC' },
      take: dto.limit,
    });
  }

  async remove(id: number) {
    await this.notificService.remove(id);
    return await this.friendRepo.delete({ id });
  }

  async acceptFriendCreator(accepterId: number, requsterId: number) {
    return await this.friendRepo.save({
      friend: { id: requsterId },
      user: { id: accepterId },
      status: true,
    });
  }
}
