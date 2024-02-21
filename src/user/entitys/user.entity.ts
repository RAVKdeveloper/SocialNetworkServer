import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PhotoUser } from 'src/userphoto/entitys/photo.entity';
import { CommentsPhoto } from 'src/comments-photo/entities/comments-photo.entity';
import { Friend } from 'src/friends/entities/friend.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  phone: string;
  @Column()
  name: string;
  @Column()
  middlename: string;
  @Column()
  surname: string;
  @Column({ default: false })
  isBanned: boolean;
  @Column({ default: 'none' })
  bannedStatus: string;
  @Column({ default: '', nullable: true })
  city?: string;
  @Column({ default: 'default.png' })
  avatar: string;
  @Column()
  password: string;
  @Column({ default: '0' })
  followers: string;
  @Column({ default: '0' })
  following: string;
  @Column()
  birthday: string;
  @Column()
  sex: string;
  @OneToMany(() => PhotoUser, (photo) => photo.user)
  photos: PhotoUser[];
  @OneToMany(() => CommentsPhoto, (comment) => comment.user)
  commentsPhoto: CommentsPhoto[];
  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[];
}
