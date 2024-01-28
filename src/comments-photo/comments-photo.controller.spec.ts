import { Test, TestingModule } from '@nestjs/testing';
import { CommentsPhotoController } from './comments-photo.controller';
import { CommentsPhotoService } from './comments-photo.service';

describe('CommentsPhotoController', () => {
  let controller: CommentsPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsPhotoController],
      providers: [CommentsPhotoService],
    }).compile();

    controller = module.get<CommentsPhotoController>(CommentsPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
