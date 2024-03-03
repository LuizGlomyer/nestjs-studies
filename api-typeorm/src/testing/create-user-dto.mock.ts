import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  name: 'Luiz Glomyer',
  email: 'glomyerjunior@hotmail.com',
  password: '123456',
  role: Role.User,
  birthDate: '2000-01-01',
};
