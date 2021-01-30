import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import UpdateProfileService from "./UpdateProfileService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'jujé felisberto',
      email: 'jujé@example.com'
    });

    expect(updatedUser.name).toBe('jujé felisberto');
    expect(updatedUser.email).toBe('jujé@example.com');
  });

  it('should not be able update the profile from non-existing user', async () => {
    expect(updateProfileService.execute({
      user_id: 'non-existing-user-id',
      email: 'teste@example.com',
      name: 'teste'
    })).rejects.toBeInstanceOf(AppError);
  });


  it('should be able to change to another user email', async () => {
    await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    const user = await fakeUsersRepository.create({ name: 'teste', email: 'teste@example.com', password: '54326587' });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'jujé felibertico',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(AppError);

  });


  it('should be able to update the password', async () => {
    await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    const user = await fakeUsersRepository.create({ name: 'teste', email: 'teste@example.com', password: '54326587' });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'jujé felibertico',
      email: 'johntree@example.com',
      old_password: '54326587',
      password: '123123'
    });

    expect(updatedUser.password).toBe('123123');

  });

  it('should not be able to update the password without old password', async () => {
    await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    const user = await fakeUsersRepository.create({ name: 'teste', email: 'teste@example.com', password: '54326587' });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'jujé felibertico',
      email: 'johntree@example.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able to update the password without wrong old password', async () => {
    await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    const user = await fakeUsersRepository.create({ name: 'teste', email: 'teste@example.com', password: '54326587' });

    await expect(updateProfileService.execute({
      user_id: user.id,
      name: 'jujé felibertico',
      email: 'johntree@example.com',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError);
  });

});
