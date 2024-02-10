import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Column } from 'typeorm';
import { User } from 'src/user/entitys/user.entity';


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
    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
