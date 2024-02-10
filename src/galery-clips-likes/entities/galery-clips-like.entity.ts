import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, JoinColumn, ManyToMany } from 'typeorm';
import { GaleryClip } from 'src/galery-clips/entities/galery-clip.entity';
import { User } from 'src/user/entitys/user.entity';


@Entity('clipsLikes')
export class GaleryClipsLike {
    @PrimaryGeneratedColumn()
    id: number
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User
    @ManyToOne(() => GaleryClip, (clip) => clip.likesClip, {
        onDelete: 'CASCADE'
    })
    @JoinTable()
    clip: GaleryClip
}
      