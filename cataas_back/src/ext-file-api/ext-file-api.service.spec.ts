import { Test, TestingModule } from '@nestjs/testing';
import { ExtFileApiService } from './ext-file-api.service';

describe('ExtFileApiService', () => {
  let service: ExtFileApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtFileApiService],
    }).compile();

    service = module.get<ExtFileApiService>(ExtFileApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
