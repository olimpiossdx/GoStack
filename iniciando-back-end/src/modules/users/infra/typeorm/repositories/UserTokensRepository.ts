
import { getRepository, Repository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../entities/UserToken';


class UserTokensRepository implements IUserTokensRepository {
  private ormRepositoy: Repository<UserToken>;

  constructor() {
    this.ormRepositoy = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.ormRepositoy.findOne({ where: { token } });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepositoy.create({ user_id });

    await this.ormRepositoy.save(userToken);

    return userToken;
  }

}

export default UserTokensRepository;
