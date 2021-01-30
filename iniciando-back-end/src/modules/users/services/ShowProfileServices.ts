
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/erros/AppError';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersRepository from '../repositories/IUserRepository';
import User from "../infra/typeorm/entities/User";

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) { }

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found.');
    }

    return user;
  }
};

export default ShowProfileService;

