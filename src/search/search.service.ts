import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from "src/user/entitys/user.entity";
import { SortingDto } from "./dto/sortingDto.dto";
import { ILike } from 'typeorm'


@Injectable()
export class SearchService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async getSearchUserandClubs(dto: SortingDto) {
         if(dto.action === "all") { 
            const users = await this.userRepository.find({ take: Number(dto.limit), order: { followers: 'DESC' } })
            return users
         } else if(dto.action === 'limits') {
           const users = await this.userRepository.find({ 
            take: Number(dto.limit), 
            order: { followers: 'DESC' },
            where: [
            { name: ILike(`%${dto.sortBy.toLowerCase()}%`) },
            { surname: ILike(`%${dto.sortBy.toLowerCase()}%`) }
        ]})
        
           return users
         }
    }

}    