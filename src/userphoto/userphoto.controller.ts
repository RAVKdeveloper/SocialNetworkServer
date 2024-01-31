import { Controller, Post, UseGuards, UseInterceptors, Request, UploadedFile, Get, Delete, Param } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from "src/user/guards/local-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { PhotoUserService } from "./userphoto.service";


@Controller('userphoto')
export class PhotoUserController {

   constructor(private readonly service: PhotoUserService) {} 
   
   @UseGuards(AuthGuard)
   @Post()
   @UseInterceptors(FileInterceptor('file', {
     storage: diskStorage({
        destination: "./uploads/userPhoto",
            filename: (req, file, cb) => {
                cb(null, `photo${uuidv4()}.${file.mimetype.substring(6)}`)
            }
     })
   }))
   uploadPhoto(@Request() request, @UploadedFile() file) {
        return this.service.createPhoto(request, file)
   }

   @UseGuards(AuthGuard)
   @Get()
   addPhotos(@Request() request) { 
    return this.service.getPhotos(request.user.sub) 
   }

   @UseGuards(AuthGuard)
   @Get('/preview')
   getPreviewPhotos(@Request() request) {
    return this.service.getPreviewPhoto(Number(request.user.sub))
   }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getPhoto(@Param('id') id: number) {
    return this.service.getOnePhoto(id)
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deletePhotos(@Param('id') id: number) {
      return this.service.deletePhotos(id)
  }

}