import { Injectable, NotFoundException } from '@nestjs/common';
import { FsHelpers } from 'src/helpers';
import { PrismaService } from 'src/prisma';
import { CreateNewsDto, UpdateNewsDto } from './dtos';

@Injectable()
export class NewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fs: FsHelpers,
  ) {}

  async getAll() {
    const news = await this.prisma.news.findMany({
      include: { author: true },
    });
    return { message: 'Success!', data: news };
  }

  async getOne(id: number) {
    const founded = await this.prisma.news.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!founded) throw new NotFoundException('News not found!');
    return { message: 'Success!', data: founded };
  }

  async create(payload: CreateNewsDto, img: Express.Multer.File) {
    let imgName = '';
    if (img) {
      imgName = await this.fs.uploadFile(img);
    }

    const created = await this.prisma.news.create({
      data: {
        title: payload.title,
        content: payload.content,
        contentUrl: payload.contentUrl,
        authorId: payload.authorId,
        ImgUrl: imgName,
      },
    });

    return { message: 'New successfully created!', data: created };
  }

  async update(id: number, payload: UpdateNewsDto, img?: Express.Multer.File) {
    const founded = await this.prisma.news.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!founded) throw new NotFoundException('News not found!');

    let imgName = founded.ImgUrl;

    if (img) {
      if (founded.ImgUrl) await this.fs.deleteFile(founded.ImgUrl);

      imgName = await this.fs.uploadFile(img);
    }

    const updated = await this.prisma.news.update({
      where: { id },
      data: { ...payload, ImgUrl: imgName },
    });

    return { message: 'News updated successfully!', data: updated };
  }

  async remove(id: number) {
    const founded = await this.prisma.news.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!founded) throw new NotFoundException('News not found!');

    if (founded.ImgUrl) {
      await this.fs.deleteFile(founded.ImgUrl);
    }

    const removed = await this.prisma.news.delete({ where: { id } });
    return { message: 'Successfully deleted!', data: removed };
  }
}
