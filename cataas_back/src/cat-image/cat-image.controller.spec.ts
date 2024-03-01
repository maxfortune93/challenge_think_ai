import { Test, TestingModule } from '@nestjs/testing';
import { CatImageController } from './cat-image.controller';
import { CatImageService } from './cat-image.service';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

describe('CatImageController', () => {
  let controller: CatImageController;
  let service: CatImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatImageController],
      providers: [CatImageService, PrismaService],
    }).compile();

    controller = module.get<CatImageController>(CatImageController);
    service = module.get<CatImageService>(CatImageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAllTags', () => {
    it('should call catImageService.findAllTags', async () => {
      const findAllTagsSpy = jest.spyOn(service, 'findAllTags');
      await controller.findAllTags();
      expect(findAllTagsSpy).toHaveBeenCalled();
    });
  });

  describe('getByFilter', () => {
    it('should call catImageService.findOneByFilter', async () => {
      const findOneByFilterSpy = jest.spyOn(service, 'findOneByFilter');
      await controller.getByFilter('tag', 'text', {} as any);
      expect(findOneByFilterSpy).toHaveBeenCalledWith('tag', 'text');
    });

    // Fazer os testes que sobrou
    describe('searchCatsByText', () => {
      it('should call catImageService.searchText', async () => {
        const searchText = 'test';
        const searchTextSpy = jest.spyOn(service, 'searchText');
        await controller.searchCatsByText(searchText);
        expect(searchTextSpy).toHaveBeenCalledWith(searchText);
      });
    });
  });
});
