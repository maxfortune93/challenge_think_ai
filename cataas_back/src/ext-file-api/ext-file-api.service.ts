import { HttpService } from '@nestjs/axios';
import { Injectable, HttpStatus } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as sharp from 'sharp';

@Injectable()
export class ExtFileApiService {
  private readonly CATAAS_API_URL = process.env.CATAAS_API_URL;
  private readonly URL_PARAMS =
    'font=Impact&fontSize=30&fontColor=white&fontBackground=none&fit=contain&position=centre';

  constructor(private readonly httpService: HttpService) {}

  async resizeImageBuffer(
    buffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    try {
      const resizedImageBuffer = await sharp(buffer)
        .resize(width, height)
        .toBuffer();

      return resizedImageBuffer;
    } catch (error) {
      console.error('Erro ao redimensionar a imagem:', error);
      throw new Error('Erro ao redimensionar a imagem');
    }
  }

  async getAllTags() {
    const url = `${this.CATAAS_API_URL}/api/tags`;
    const response = await lastValueFrom(this.httpService.get(url));
    return response;
  }

  async getRandomImage() {
    const url = `${this.CATAAS_API_URL}/cat`;
    return await this.getImageFromUrl(url);
  }

  async getImageByQuery(tag: string, text: string) {
    const queryString = text
      ? `/cat/says/${text}?${this.URL_PARAMS}`
      : `/cat/${tag}?position=centre`;
    const url = `${this.CATAAS_API_URL}${queryString}`;
    return await this.getImageFromUrl(url);
  }

  async getImageByTagAndName(tag: string, text: string) {
    console.log('getImageByTagAndName', tag, text);
    const url = `${this.CATAAS_API_URL}/cat/${tag}/says/${text}?${this.URL_PARAMS}`;
    return await this.getImageFromUrl(url);
  }

  //   private async getImageFromUrl(url: string) {
  //     const response = await lastValueFrom(
  //       this.httpService.get(url, { responseType: 'arraybuffer' }),
  //     );
  //     return this.resizeImageBuffer(response.data, 900, 476);
  //   }
  private async getImageFromUrl(url: string) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(url, { responseType: 'arraybuffer' }),
      );

      return this.resizeImageBuffer(response.data, 500, 262);
    } catch (error) {
      if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
        throw new Error('Image not found');
      } else {
        console.error('Error in getImageFromUrl:', error);
        throw error;
      }
    }
  }
}
