import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDTO: UpdatePutUserDTO = {
  name: 'Luiz Glomyer',
  email: 'glomyerjunior@hotmail.com',
  password: '123456',
  role: Role.User,
  birthDate: '2000-01-01',
};
