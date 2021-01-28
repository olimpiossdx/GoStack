import AppError from "@shared/erros/AppError";
import { uuid } from "uuidv4";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create tow appointments on the same time', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    expect(createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' })).rejects.toBeInstanceOf(AppError);

  });

});
