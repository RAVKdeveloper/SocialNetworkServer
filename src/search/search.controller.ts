import { Body, Controller, Post, UseGuards, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { AuthGuard } from 'src/user/guards/local-auth.guard';
import { SortingDto } from './dto/sortingDto.dto';

@Controller('search')
export class SearchController {
    constructor(private readonly SearchService: SearchService ) {}

    @UseGuards(AuthGuard)
    @Get()
    allusersAndClubs(@Query() dto: SortingDto) {
        return this.SearchService.getSearchUserandClubs(dto)
    }
}
