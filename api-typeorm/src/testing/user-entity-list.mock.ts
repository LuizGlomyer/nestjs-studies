import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    name: 'Luiz Glomyer',
    email: 'glomyerjunior@hotmail.com',
    password: '$2b$10$q53qOF15FRrZ2KBqUtFb3u9914y1xyv/WWp0vBLlAs9squCqwMNh2',
    role: Role.Admin,
    birthDate: new Date('2000-01-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Glomy',
    email: 'glomyer@hotmail.com',
    password: '$2b$10$q53qOF15FRrZ2KBqUtFb3u9914y1xyv/WWp0vBLlAs9squCqwMNh2',
    role: Role.Admin,
    birthDate: new Date('2000-01-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Gloglo',
    email: 'gloglo@hotmail.com',
    password: '$2b$10$q53qOF15FRrZ2KBqUtFb3u9914y1xyv/WWp0vBLlAs9squCqwMNh2',
    role: Role.Admin,
    birthDate: new Date('2000-01-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
