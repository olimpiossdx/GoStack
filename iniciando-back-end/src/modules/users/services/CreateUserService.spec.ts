import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create tow appointments on the same time', async () => {
    await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await expect(createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' })).rejects.toBeInstanceOf(AppError);
  });
});
