import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { CheckPhoneDto } from './dto/check-phone.dto';
import { User } from './entitys/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UploadAvatarDto } from './dto/uploadAvatar.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async registration(userDto: CreateUserDTO, respones) {
    const salt = await bcrypt.genSalt(10);
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
      sex: userDto.sex,
    };

    const user = await this.userRepository.save(registr);

    const payload = { sub: user.id, name: user.name };
    const token = await this.jwtService.signAsync(payload);

    respones.cookie('tokenAuth', token);

    return { access_token: token, user };
  }

  async checkPhone(phoneDto: CheckPhoneDto) {
    const user = await this.userRepository.findBy(phoneDto);

    if (user.length > 0)
      throw new HttpException(
        'Такой пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );

    return { message: 'nomber complete!!!' };
  }

  async login(userDto: LoginUserDto, respones) {
    const user = await this.userRepository.findBy({ phone: userDto.phone });

    if (user.length === 0)
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );

    const isValidPass = await bcrypt.compare(
      userDto.password,
      user[0].password,
    );

    if (!isValidPass)
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );

    const payload = { sub: user[0].id, name: user[0].name };

    const { password, ...userData } = user[0];

    const token = await this.jwtService.signAsync(payload);

    respones.cookie('tokenAuth', token);

    return {
      access_token: token,
      user: userData,
    };
  }

  async me(id: number) {
    const { password, ...userData } = await this.userRepository.findOneBy({
      id,
    });

    return userData;
  }

  async uploadAvatar(dto: UploadAvatarDto) {
    const user = await this.userRepository.findOneBy({ id: Number(dto.id) });

    if (!user)
      return new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

    user.avatar = dto.file.filename;

    return this.userRepository.save(user);
  }

  async deleteAvatar(id: string) {
    const file = path.join(__dirname, `../../uploads/avatar/${id}`);
    fs.unlink(file, (err) => console.log(err));
    return { message: 'succes' };
  }
}
