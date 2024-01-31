import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from 'path'
import * as fs from 'fs'
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { PhotoUser } from "./entitys/photo.entity";


@Injectable() 
export class PhotoUserService {
    constructor(@InjectRepository(PhotoUser) private photoRepo: Repository<PhotoUser>) {}

    async createPhoto(req: any, file: any) {
        const photo = this.photoRepo.save({ photo: file.filename, user: { id: req.user.sub } })

        return photo
    } 

    async getPhotos(userId: number) {
        const photos = await this.photoRepo.find({ relations: {
            user: true,
            likesPhoto: true
        }, where: { user: { id: userId } }})
        
        return photos
    }

    async getPreviewPhoto(userId: number) {
        const photos = await this.photoRepo.find({ relations: {
            user: true,
            likesPhoto: true
        }, where: { user: { id: userId } }})

        const arr = photos.sort((a, b) => a.id - b.id).reverse()

        return this.maxPhotos(arr, 3)
    }

    async getOnePhoto(id: number) {
        const photo = await this.photoRepo.findOne({ relations: {
            likesPhoto: true, 
            user: true
        }, where: { id } })

        if(!photo) throw new HttpException('Фото не найденно', HttpStatus.NOT_FOUND)

        return photo
    }

    async deletePhotos(id: number) {
        const photo = await this.photoRepo.findOneBy({ id })

        const file = path.join(__dirname, `../../uploads/userPhoto/${photo.photo}`)
        fs.unlink(file, err => console.log(err))
        return this.photoRepo.delete(id)
    }

    async maxPhotos(arr: any, count: number) {
       let result = []

       for(let i = 0; i < count; i++) {
          if(arr[i]) result.push(arr[i]) 
       }

       return result
    }
} 