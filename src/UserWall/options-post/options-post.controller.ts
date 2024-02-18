import { Controller, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { OptionsPostService } from './options-post.service';
import { AuthGuard } from 'src/user/guards/local-auth.guard';

@Controller('wall/options-post')
export class OptionsPostController {

  constructor(private readonly service: OptionsPostService) {}

  @UseGuards(AuthGuard)
  @Patch('optionComments/:id')
  optionComments(@Body('isComments') isComments: boolean, @Req() request, @Param('id') postId: number) {
      return this.service.updateComments(postId, request.user.sub, isComments)  
  }

}
