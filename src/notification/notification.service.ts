import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificRepo: Repository<Notification>,
  ) {}

  async create(reqTo: number, sendFrom: number, friendId: number) {
    return await this.notificRepo.save({
      requestTo: { id: reqTo },
      sentFrom: { id: sendFrom },
      friendId: { id: friendId },
    });
  }

  async accept(accepter: number, sendFrom: number, notificId: number) {
    await this.notificRepo.update(
      { id: notificId },
      { status: true, isRead: true },
    );

    return await this.notificRepo.save({
      requestTo: { id: accepter },
      sendFrom: { id: sendFrom },
      status: true,
    });
  }

  findAll(userId: number) {
    return this.notificRepo.find({
      relations: { requestTo: true, friendId: true },
      where: { sentFrom: { id: userId } },
      order: { id: 'DESC' },
      take: 30,
    });
  }

  remove(id: number) {
    return this.notificRepo.delete({ friendId: { id } });
  }
}
