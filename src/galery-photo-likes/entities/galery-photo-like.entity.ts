import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, JoinTable } from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { PhotoUser } from 'src/userphoto/entitys/photo.entity';

@Entity('galery-photo-likes')
export class GaleryPhotoLike {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User
    @ManyToOne(() => PhotoUser, { nullable: false })
    @JoinTable()
    photo: PhotoUser
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date
}
