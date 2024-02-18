import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, JoinColumn, ManyToMany } from 'typeorm';
import { User } from 'src/user/entitys/user.entity';
import { WallPost } from 'src/UserWall/create-post/entities/create-post.entity';


@Entity('wall_post_likes')
export class WallPostLike {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    filterUserId: number
    @ManyToMany(() => User, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User
    @ManyToOne(() => WallPost, (post) => post.likes, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })
    post: WallPost
}
 