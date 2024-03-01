import {
  Controller,
  Get,
  Query,
  Res,
  HttpStatus,
  HttpException,
  UseInterceptors,
} from '@nestjs/common';
import { CatImageService } from './cat-image.service';
import { Response } from 'express';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('cat-image')
export class CatImageController {
  constructor(private readonly catImageService: CatImageService) {}

  @Get('/tags')
  findAllTags() {
    return this.catImageService.findAllTags();
  }

  @Get()
  async getByFilter(
    @Query('tag') tag: string,
    @Query('text') text: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.catImageService.findOneByFilter(tag, text);
      if (response.id) {
        return res.status(HttpStatus.OK).json({ value: response });
      } else if (response instanceof Buffer) {
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename="image.jpeg"`,
        );
        return res.send(response);
      } else {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Image not found',
        });
      }
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Image not found' });
      } else {
        console.error('Error in getByFilter:', error);
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal server error' });
      }
    }
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/autocomplete')
  async searchCatsByText(@Query('text') searchText: string): Promise<string[]> {
    // Chama o método do serviço para buscar os gatos pelo texto parcial
    const cats = await this.catImageService.searchText(searchText);
    return cats;
  }
}
