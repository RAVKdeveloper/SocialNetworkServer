import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { Friend } from './entities/friend.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { User } from 'src/user/entitys/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Friend, User]), NotificationModule],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
