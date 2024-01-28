import { Test, TestingModule } from '@nestjs/testing';
import { CommentsPhotoService } from './comments-photo.service';

describe('CommentsPhotoService', () => {
  let service: CommentsPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsPhotoService],
    }).compile();

    service = module.get<CommentsPhotoService>(CommentsPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
