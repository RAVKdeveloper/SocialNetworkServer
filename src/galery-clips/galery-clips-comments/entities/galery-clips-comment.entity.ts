import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { GaleryClip } from 'src/galery-clips/entities/galery-clip.entity';

@Entity('comments_clip')
export class GaleryClipsComment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  text: string;
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => GaleryClip, (clip) => clip.commentsClip, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'clip_id' })
  clip: GaleryClip;
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
