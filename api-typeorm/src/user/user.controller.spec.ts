import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDTO } from '../testing/update-patch-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validate definition', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Application Guards', () => {
    test('If guards are being applied', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);
      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('create method', async () => {
      const result = await userController.create(createUserDTO);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Read', () => {
    test('list method', async () => {
      const result = await userController.list();
      expect(result).toEqual(userEntityList);
    });
    test('show method', async () => {
      const result = await userController.show(1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Update', () => {
    test('update method', async () => {
      const result = await userController.update(updatePutUserDTO, 1);
      expect(result).toEqual(userEntityList[0]);
    });
    test('updatePartial method', async () => {
      const result = await userController.updatePartial(updatePatchUserDTO, 1);
      expect(result).toEqual(userEntityList[0]);
    });
  });

  describe('Delete ', () => {
    test('delete method', async () => {
      const result = await userController.delete(1);
      expect(result).toEqual({ success: true });
    });
  });
});
