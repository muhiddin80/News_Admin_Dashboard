import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { LoginUserDto, RegisterUserDto, UpdateUserDto } from './dtos';
import { compareSync, hashSync } from 'bcryptjs';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const existing = await this.prisma.user.findUnique({
      where: { email: 'john@example.com' },
    });
    if (!existing) {
      await this.prisma.user.create({
        data: {
          email: 'john@example.com',
          password: hashSync('1234'),
          name: 'John Doe',
          role: 'ADMIN',
        },
      });
    }
  }

  async getAll() {
    const user = await this.prisma.user.findMany();
    return { message: 'Success!', data: user };
  }

  async getOne(id: number) {
    const founded = await this.prisma.user.findUnique({ where: { id } });
    if (!founded) throw new NotFoundException('User not found!');
    return { message: 'Success!', data: founded };
  }

  async register(payload: RegisterUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (existing)
      throw new BadRequestException('User with this email is already exist!');

    const password = hashSync(payload.password);
    const newUser = await this.prisma.user.create({
      data: { email: payload.email, password, name: payload.name },
    });

    return { message: 'Successfully registered!', data: newUser };
  }

  async login(payload: LoginUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!existing) throw new BadRequestException('Invalid credentials!');

    const passwordMatch = compareSync(payload.password, existing.password);

    if (!passwordMatch) throw new BadRequestException('Invalid credentials!');
    return { message: 'Successfully logged!', data: existing };
  }

  async update(id: number, payload: UpdateUserDto) {
    const founded = await this.prisma.user.findUnique({ where: { id } });
    if (!founded) throw new NotFoundException('User not found!');

    const newUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...payload,
      },
    });

    return { message: 'Successfully updated!', data: newUser };
  }

  async remove(id: number) {
    const founded = await this.prisma.user.findUnique({ where: { id } });
    if (!founded) throw new NotFoundException('User not found!');

    const deleted = await this.prisma.user.delete({ where: { id } });
    return { message: 'Successfully deleted!', deleted };
  }
}
