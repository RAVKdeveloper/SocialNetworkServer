import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { CommentsPhoto } from 'src/comments-photo/entities/comments-photo.entity';
import { GaleryPhotoLike } from 'src/galery-photo-likes/entities/galery-photo-like.entity';


@Entity('userphoto')
export class PhotoUser {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    photo: string;
    @ManyToOne(() => User, (user) => user.photos, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User
    @OneToMany(() => CommentsPhoto, (comment) => comment.photo)
    commentsPhoto: CommentsPhoto[]
    @OneToMany(() => GaleryPhotoLike, (like) => like.photo)
    likesPhoto: GaleryPhotoLike[]
    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}