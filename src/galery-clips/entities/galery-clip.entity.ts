import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/entitys/user.entity';


@Entity('userclips')
export class GaleryClip {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    video: string
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user: User
    @CreateDateColumn({ type: 'timestamp' })
    createAt: Date;
    @UpdateDateColumn({ type: 'timestamp' })
    updateAt: Date;
}
