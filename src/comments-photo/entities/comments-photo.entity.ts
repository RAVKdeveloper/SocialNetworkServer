import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, JoinTable } from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { PhotoUser } from 'src/userphoto/entitys/photo.entity';

@Entity('comments-photo')
export class CommentsPhoto {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ nullable: false })
    text: string
    @Column({ default: false })
    answer: boolean
    @ManyToOne(() => User, (user) => user.commentsPhoto, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User
    @ManyToOne(() => PhotoUser, { nullable: false })
    @JoinTable()
    photo: PhotoUser
    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
