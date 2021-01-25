import { hash } from "bcryptjs";

import AppError from "@shared/erros/AppError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
};

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({ name, email, password: hashedPassword });

    delete user.password;

    return user;
  }
};

export default CreateUserService;
