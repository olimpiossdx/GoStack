import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticate = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    const response = await authenticate.execute({ email: 'johndoe@example.com', password: '54326587' });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);

  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await expect(createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' })).rejects.toBeInstanceOf(AppError);

  });


  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticate = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    await expect(authenticate.execute({ email: 'johndoe@example.com', password: '54326587' })).rejects.toBeInstanceOf(AppError);

  });

  it('should be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticate = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await expect(authenticate.execute({ email: 'johndoe@example.com', password: 'wrong-password' })).rejects.toBeInstanceOf(AppError);

  });

});
