import { Test, TestingModule } from '@nestjs/testing';
import { GaleryClipsService } from './galery-clips.service';

describe('GaleryClipsService', () => {
  let service: GaleryClipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GaleryClipsService],
    }).compile();

    service = module.get<GaleryClipsService>(GaleryClipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
