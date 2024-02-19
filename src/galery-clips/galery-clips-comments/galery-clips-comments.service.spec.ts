import { Test, TestingModule } from '@nestjs/testing';
import { GaleryClipsCommentsService } from './galery-clips-comments.service';

describe('GaleryClipsCommentsService', () => {
  let service: GaleryClipsCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GaleryClipsCommentsService],
    }).compile();

    service = module.get<GaleryClipsCommentsService>(
      GaleryClipsCommentsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
