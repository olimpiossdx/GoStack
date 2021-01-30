import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticate: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticate = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    const response = await authenticate.execute({ email: 'johndoe@example.com', password: '54326587' });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create two appointments on the same time', async () => {
    await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await expect(createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' })).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able to authenticate with non existing user', async () => {
    await expect(authenticate.execute({ email: 'johndoe@example.com', password: '54326587' })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong password', async () => {
    await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await expect(authenticate.execute({ email: 'johndoe@example.com', password: 'wrong-password' })).rejects.toBeInstanceOf(AppError);
  });
});
