import { Test, TestingModule } from '@nestjs/testing';
import { GaleryPhotoLikesService } from './galery-photo-likes.service';

describe('GaleryPhotoLikesService', () => {
  let service: GaleryPhotoLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GaleryPhotoLikesService],
    }).compile();

    service = module.get<GaleryPhotoLikesService>(GaleryPhotoLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
