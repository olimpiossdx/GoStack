import FakeDikStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import UpdateUserAvatarService from "./UpdateUserAvatarService";

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeDikStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeDikStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  });
  it('should be able to update', async () => {
    const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await updateUserAvatar.execute({ user_id: user.id, avatarFilename: 'avatar.jpg' });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(updateUserAvatar.execute({ user_id: 'non-existing-user', avatarFilename: 'avatar.jpg' })).rejects.toBeInstanceOf(AppError);
  });


  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await updateUserAvatar.execute({ user_id: user.id, avatarFilename: 'avatar2.jpg' });

    await updateUserAvatar.execute({ user_id: user.id, avatarFilename: 'avatar.jpg' });

    expect(deleteFile).toHaveBeenCalledWith('avatar2.jpg');
    expect(user.avatar).toBe('avatar.jpg');
  });
});
