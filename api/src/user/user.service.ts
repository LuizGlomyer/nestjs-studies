import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
    });
  }

  async list() {
    return this.prisma.user.findMany();
  }

  async show(id: number) {
    await this.exists(id);

    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    { email, name, password, birthDate }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    return this.prisma.user.update({
      data: {
        email,
        name,
        password,
        birthDate: birthDate ? new Date(birthDate) : null,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }

  async updatePartial(id: number, data: UpdatePatchUserDTO) {
    await this.exists(id);

    if (data.birthDate) {
      const date = new Date(data.birthDate).toISOString();
      data.birthDate = String(date);
    }

    return this.prisma.user.update({
      data: {
        ...data,
        updatedAt: new Date(),
      },
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`There is no user with the '${id}' id`);
    }
  }
}
