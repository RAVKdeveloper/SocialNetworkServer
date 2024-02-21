import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { Friend } from 'src/friends/entities/friend.entity';

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false })
  status: boolean;
  @Column({ default: false })
  isRead: boolean;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  sentFrom: User;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  requestTo: User;
  @ManyToOne(() => Friend, { onDelete: 'CASCADE' })
  friendId: Friend;
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
