import { Test, TestingModule } from '@nestjs/testing';
import { GaleryClipsLikesService } from './galery-clips-likes.service';

describe('GaleryClipsLikesService', () => {
  let service: GaleryClipsLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GaleryClipsLikesService],
    }).compile();

    service = module.get<GaleryClipsLikesService>(GaleryClipsLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
