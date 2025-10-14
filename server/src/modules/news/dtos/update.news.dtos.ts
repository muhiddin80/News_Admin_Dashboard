import { PartialType } from '@nestjs/mapped-types';
import { CreateNewsDto } from './create.news.dtos';

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
