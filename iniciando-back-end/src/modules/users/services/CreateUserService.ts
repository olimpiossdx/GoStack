import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/erros/AppError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUserRepository";
import IHashProvider from "../providers/models/IHashProvider";

interface IRequest {
  name: string;
  email: string;
  password: string;
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({ name, email, password: hashedPassword });

    // delete user.password;

    return user;
  }
};

export default CreateUserService;
