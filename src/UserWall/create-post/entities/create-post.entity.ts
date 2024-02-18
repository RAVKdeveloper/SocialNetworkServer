import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Column, OneToMany } from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { WallPostLike } from 'src/UserWall/wall-post-likes/entities/wall-post-like.entity';
import { WallPostComment } from 'src/UserWall/wall-post-comments/entities/wall-post-comment.entity';


@Entity('wall_post')
export class WallPost {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    text: string
    @Column({ default: '' })
    contentMedia: string
    @Column({ default: '' })
    typeContentMedia: string
    @Column({ default: 0 })
    visible: number
    @Column()
    isComments: boolean
    @Column()
    visibleAction: string
    @Column()
    isSendNotific: boolean
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User
    @OneToMany(() => WallPostLike, (like) => like.post)
    likes: WallPostLike[]
    @OneToMany(() => WallPostComment, (comment) => comment.post)
    comments: WallPostComment[]
    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
