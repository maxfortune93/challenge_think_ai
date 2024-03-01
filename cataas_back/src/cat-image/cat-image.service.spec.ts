import { Test, TestingModule } from '@nestjs/testing';
import { CatImageService } from './cat-image.service';

describe('CatImageService', () => {
  let service: CatImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatImageService],
    }).compile();

    service = module.get<CatImageService>(CatImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
