import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { CheckPhoneDto } from "./dto/check-phone.dto";
import { User } from "./entitys/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";


@Injectable() 
export class UserService{
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {}

    async getAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    async getById(id: number): Promise<User[]> {
        return this.userRepository.findBy({ id })
    }

    async registration(userDto: CreateUserDTO) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(userDto.password, salt);
        const registr = {
            phone: userDto.phone,
            name: userDto.name,
            middlename: userDto.middlename,
            surname: userDto.surname,
            isBanned: userDto.isBanned,
            bannedStatus: userDto.bannedStatus,
            city: userDto.city,
            birthday: userDto.birthday,
            avatar: userDto.avatar,
            password: passwordHash,
            sex: userDto.sex
        }
        return this.userRepository.save(registr)
    }
    
    async checkPhone(phoneDto: CheckPhoneDto) {
        const user = await this.userRepository.findBy(phoneDto)

        if(user.length > 0) throw new HttpException('Такой пользователь уже существует', HttpStatus.BAD_REQUEST)

        return { message: 'nomber complete!!!' }
    }

    async login(userDto: LoginUserDto) {
        const user = await this.userRepository.findBy({ phone: userDto.phone })

        if(user.length === 0) throw new HttpException('Неверный логин или пароль', HttpStatus.BAD_REQUEST)

        const isValidPass = await bcrypt.compare(userDto.password, user[0].password)

        if(!isValidPass) throw new HttpException('Неверный логин или пароль', HttpStatus.BAD_REQUEST)

        const payload = { sub: user[0].id, username: user[0].name };

        const { password, ...userData } = user[0]

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: userData
          };
    }
}
 