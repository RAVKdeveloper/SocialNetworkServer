import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { WallPost } from 'src/UserWall/create-post/entities/create-post.entity';

@Entity('wall_post_comments')
export class WallPostComment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: '' })
  text: string;
  @Column({ default: null })
  answerRef: string;
  @Column({ default: '' })
  imgUrl: string;
  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => WallPost, (post) => post.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: WallPost;
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
}
