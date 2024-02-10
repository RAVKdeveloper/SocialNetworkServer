import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { GaleryClipsLike } from 'src/galery-clips-likes/entities/galery-clips-like.entity';
import { GaleryClipsComment } from '../galery-clips-comments/entities/galery-clips-comment.entity';


@Entity('userclips')
export class GaleryClip {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    video: string
    @Column({ default: '' })
    preview: string
    @Column({ default: '' })
    description: string
    @Column({ default: true })
    isComments: boolean
    @Column({ default: 'all' })
    visible: string
    @Column({ default: 0 })
    views: number
    @Column({ default: false }) 
    confirm: boolean

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User

    @OneToMany(() => GaleryClipsLike, (like) => like.clip, { onDelete: 'CASCADE' })
    likesClip: GaleryClipsLike[]

    @OneToMany(() => GaleryClipsComment, (comment) => comment.clip, { onDelete: 'CASCADE' })
    commentsClip: GaleryClipsComment[]

    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
    