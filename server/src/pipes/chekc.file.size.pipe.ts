import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CheckFileSizePipe implements PipeTransform {
  size: number;
  constructor(size) {
    this.size = size;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) return value;
    if (value.size > this.size) {
      throw new BadRequestException('Send smaller file!');
    }
    return value;
  }
}
