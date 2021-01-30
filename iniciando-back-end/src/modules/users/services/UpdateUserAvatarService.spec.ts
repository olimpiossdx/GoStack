import FakeDikStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

describe('UpdateUserAvatar', () => {
  it('should be able to update', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeDikStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await updateUserAvatar.execute({ user_id: user.id, avatarFilename: 'avatar.jpg' });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeDikStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    await expect(updateUserAvatar.execute({ user_id: 'non-existing-user', avatarFilename: 'avatar.jpg' })).rejects.toBeInstanceOf(AppError);
  });


  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeDikStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await updateUserAvatar.execute({ user_id: user.id, avatarFilename: 'avatar2.jpg' });

    await updateUserAvatar.execute({ user_id: user.id, avatarFilename: 'avatar.jpg' });

    expect(deleteFile).toHaveBeenCalledWith('avatar2.jpg');
    expect(user.avatar).toBe('avatar.jpg');
  });

});
