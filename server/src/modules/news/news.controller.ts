import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dtos';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getAll() {
    return this.newsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new news article',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'New technological breakthrough in AI research',
        },
        content: {
          type: 'string',
          example:
            'Researchers have achieved a major milestone in artificial intelligence...',
        },
        contentUrl: {
          type: 'string',
          example: 'https://example.com/news/ai-breakthrough',
        },
        authorId: {
          type: 'integer',
          example: 1,
        },
        img: {
          type: 'string',
          format: 'binary',
          description: 'Image file for the news article',
        },
      },
      required: ['title', 'content', 'authorId'],
    },
  })
  async create(
    @Body() payload: CreateNewsDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.newsService.create(payload, img);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('img'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new news article',
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'New technological breakthrough in AI research',
        },
        content: {
          type: 'string',
          example:
            'Researchers have achieved a major milestone in artificial intelligence...',
        },
        contentUrl: {
          type: 'string',
          example: 'https://example.com/news/ai-breakthrough',
        },
        authorId: {
          type: 'integer',
          example: 1,
        },
        img: {
          type: 'string',
          format: 'binary',
          description: 'Image file for the news article',
        },
      },
      required: ['title', 'content', 'authorId'],
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return this.newsService.update(id, payload, img);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }
}
