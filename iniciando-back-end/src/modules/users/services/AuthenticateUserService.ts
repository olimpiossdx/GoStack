import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";

import AppError from "@shared/erros/AppError";
import authConfig from "@config/auth";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import IHashProvider from "../providers/models/IHashProvider";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorret email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, { subject: user.id, expiresIn });

    return { user, token };
  }
};

export default AuthenticateUserService;
