import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { User } from 'src/user/entitys/user.entity';

@Entity('friends')
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: false })
  status: boolean;
  @ManyToOne(() => User, (user) => user.friends, { onDelete: 'CASCADE' })
  user: User;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  friend: User;
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}

// Friend has requestTo
// User hes sendFrom
