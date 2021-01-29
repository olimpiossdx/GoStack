import { inject, injectable } from "tsyringe";

import AppError from "@shared/erros/AppError";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUserRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";

interface IRequest {
  email: string;
};

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider) { }

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'envio de email recebido');

  }
};

export default SendForgotPasswordEmailService;
