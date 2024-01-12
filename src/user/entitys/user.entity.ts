import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    phone: string
    @Column()
    name: string
    @Column()
    middlename: string
    @Column()
    surname: string
    @Column({ default: false })
    isBanned: boolean
    @Column({ default: 'none' })
    bannedStatus: string
    @Column({ default: '', nullable: true })
    city?: string
    @Column({ default: 'none' })
    avatar: string
    @Column()
    password: string
    @Column({ default: '0' })
    followers: string
    @Column({ default: '0' })
    following: string
    @Column()
    birthday: string
    @Column()
    sex: string
}