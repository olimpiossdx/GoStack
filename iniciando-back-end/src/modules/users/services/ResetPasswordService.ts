import { inject, injectable } from "tsyringe";

import AppError from "@shared/erros/AppError";
import IUsersRepository from "../repositories/IUserRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  token: string;
  password: string;
};

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository) { }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User  does not exists');
    }

    user.password = password;

    this.usersRepository.save(user);
  }
};

export default ResetPasswordService;
