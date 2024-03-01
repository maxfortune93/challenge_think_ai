import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCatImageDto } from './dto/create-cat-image.dto';
import { UpdateCatImageDto } from './dto/update-cat-image.dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { ExtFileApiService } from 'src/ext-file-api/ext-file-api.service';
import { Cache } from 'cache-manager';

@Injectable()
export class CatImageService {
  private readonly CATAAS_API_URL = process.env.CATAAS_API_URL;

  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private s3Service: AwsS3Service,
    private extFileService: ExtFileApiService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}
  async create(createCatImageDto: CreateCatImageDto) {
    // const existData = await this.prismaService.cat.findFirst({
    //   where: {
    //     tag: createCatImageDto.tag,
    //     text: createCatImageDto.text,
    //   },
    // });
    // if (existData) {
    //   console.log(existData);
    //   return existData;
    // }
    const result = await this.prismaService.cat.create({
      data: createCatImageDto,
    });
    return result;
  }

  findAll() {
    return `This action returns all catImage`;
  }

  async findAllTags() {
    const response = await this.extFileService.getAllTags();
    return response.data;
  }

  async findIfExistRegister(updateCatImageDto: UpdateCatImageDto) {
    const cachedData: CreateCatImageDto | null =
      await this.cacheManager.get('tagAndTextImage');
    console.log('cachedData ----->', cachedData);
    if (cachedData) {
      return cachedData;
    }
    console.log('updateCatImageDto ----->', updateCatImageDto);
    const result = await this.prismaService.cat.findFirst({
      where: {
        tag: updateCatImageDto.tag,
        text: updateCatImageDto.text,
      },
    });
    console.log('result ----->', result);
    if (result?.imageUrl) {
      await this.cacheManager.set('tagAndTextImage', result);
    }
    return result;
  }

  async findOneByFilter(tag: string, text: string) {
    try {
      let response;

      if (tag && text) {
        console.log('entrou No tag test', tag, text);
        const existData = await this.findIfExistRegister({ tag, text });
        if (existData?.imageUrl) {
          return existData;
        } else {
          response = await this.extFileService.getImageByTagAndName(tag, text);
          const fileName = `cataas_image_${Date.now()}.jpeg`;
          const s3 = await this.s3Service.upload(fileName, response);
          return this.create({ tag, text, imageUrl: s3 });
        }
      } else if (tag || text) {
        response = await this.extFileService.getImageByQuery(tag, text);
      } else {
        response = await this.extFileService.getRandomImage();
      }

      if (!response) {
        throw new Error('Image not found'); // Lança uma exceção se nenhuma imagem for encontrada
      }
      return response;
    } catch (error) {
      console.error('Error in findOneByFilter:', error);
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateCatImageDto: UpdateCatImageDto) {
    return await this.prismaService.cat.update({
      where: { id },
      data: updateCatImageDto,
    });
  }

  async searchText(searchText: string): Promise<string[]> {
    const cats = await this.prismaService.cat.findMany({
      where: {
        // Filtra os gatos onde o texto contém a sequência fornecida
        text: {
          contains: searchText,
        },
      },
      // Limita o número de resultados, se necessário
      take: 10,
      // Você também pode ordenar os resultados, se necessário
      orderBy: {
        text: 'asc', // ou 'desc' para ordenar de forma decrescente
      },
    });

    // Extrai apenas o texto dos gatos para o retorno
    const catTexts = cats.map((cat) => cat.text);

    return catTexts;
  }
  remove(id: number) {
    return `This action removes a #${id} catImage`;
  }
}
