import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from "src/user/entitys/user.entity";
import { SortingDto } from "./dto/sortingDto.dto";


@Injectable()
export class SearchService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async getSearchUserandClubs(dto: SortingDto) {
         if(dto.action === "all") { 
            const users = await this.userRepository.find()
            return this.maxSorting(users, Number(JSON.parse(dto.limit)))
         } else if(dto.action === 'limits') {
           const users = await this.userRepository.find()
           const strSort = dto.sortBy.toLowerCase()

           const sortUsers = users.filter(user => user.name.includes(strSort)
           || user.surname.includes(strSort)
           )

           let res = this.maxSorting(sortUsers, Number(dto.limit))

           return res
         }
    }

    async maxSorting(arr: any, current: number) {

        let resArr = []

         for(let i = 0; i < current; i++) {
             if(arr[i] != null) {
                 resArr.push(arr[i])
            }
         }

         return resArr
    }
}    