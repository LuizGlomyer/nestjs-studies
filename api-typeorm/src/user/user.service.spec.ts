import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDTO } from '../testing/update-patch-user-dto.mock';

describe('UserService', () => {
  let userServive: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userServive = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validar a definição', () => {
    expect(userServive).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('create method', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false);
      const result = await userServive.create(createUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('list method', async () => {
      const result = await userServive.list();

      expect(result).toEqual(userEntityList);
    });

    test('show method', async () => {
      const result = await userServive.show(1);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('update method', async () => {
      const result = await userServive.update(1, updatePutUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });

    test('updatePartial method', async () => {
      const result = await userServive.updatePartial(1, updatePatchUserDTO);

      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await userServive.delete(1);

      expect(result).toEqual(true);
    });
  });
});
