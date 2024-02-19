import { Test, TestingModule } from '@nestjs/testing';
import { GaleryPhotoLikesController } from './galery-photo-likes.controller';
import { GaleryPhotoLikesService } from './galery-photo-likes.service';

describe('GaleryPhotoLikesController', () => {
  let controller: GaleryPhotoLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GaleryPhotoLikesController],
      providers: [GaleryPhotoLikesService],
    }).compile();

    controller = module.get<GaleryPhotoLikesController>(
      GaleryPhotoLikesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
