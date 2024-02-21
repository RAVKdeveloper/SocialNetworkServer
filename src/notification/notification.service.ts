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

  async create(reqTo: number, sendFrom: number) {
    return await this.notificRepo.save({
      requestTo: { id: reqTo },
      sentFrom: { id: sendFrom },
    });
  }

  async accept(accepter: number, sendFrom: number) {
    return await this.notificRepo.save({
      requestTo: { id: accepter },
      sendFrom: { id: sendFrom },
    });
  }

  findAll(userId: number) {
    return this.notificRepo.find({
      relations: { requestTo: true },
      where: { sentFrom: { id: userId } },
      order: { id: 'DESC' },
    });
  }

  remove(id: number) {
    return this.notificRepo.delete({ id });
  }
}
