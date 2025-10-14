import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { PrismaService } from 'src/prisma';
import { FsHelpers } from 'src/helpers';

@Module({
  controllers: [NewsController],
  providers: [NewsService, FsHelpers, PrismaService],
})
export class NewsModule {}
