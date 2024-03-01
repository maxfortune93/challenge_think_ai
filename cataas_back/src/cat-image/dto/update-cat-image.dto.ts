import { PartialType } from '@nestjs/mapped-types';
import { CreateCatImageDto } from './create-cat-image.dto';

export class UpdateCatImageDto extends PartialType(CreateCatImageDto) {}
