import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    if (
      await this.usersRepository.exists({
        where: {
          email: data.email,
        },
      })
    ) {
      throw new BadRequestException('This e-mail is already being used');
    }

    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const user = this.usersRepository.create(data);

    return this.usersRepository.save(user);
  }

  async list() {
    return this.usersRepository.find();
  }

  async show(id: number) {
    await this.exists(id);

    return this.usersRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    { email, name, password, birthDate, role }: UpdatePutUserDTO,
  ) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

    await this.usersRepository.update(id, {
      email,
      name,
      password,
      birthDate: birthDate ? new Date(birthDate) : null,
      updatedAt: new Date(),
      role: role ?? 1,
    });

    return this.show(id);
  }

  async updatePartial(id: number, data: UpdatePatchUserDTO) {
    await this.exists(id);

    if (data.password) {
      const salt = await bcrypt.genSalt();
      data.password = await bcrypt.hash(data.password, salt);
    }

    if (data.birthDate) {
      const date = new Date(data.birthDate).toISOString();
      data.birthDate = String(date);
    }

    await this.usersRepository.update(id, {
      ...data,
      updatedAt: new Date(),
    });

    return this.show(id);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.usersRepository.delete(id);
  }

  async exists(id: number) {
    if (
      !(await this.usersRepository.exists({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`There is no user with the '${id}' id`);
    }
  }
}
