
import { getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import User from '../entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UserRepository implements IUsersRepository {
  private ormRepositoy: Repository<User>;

  constructor() {
    this.ormRepositoy = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepositoy.findOne(id)
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepositoy.findOne({ where: { email } })
    return user;
  }

  public async findByDate(date: Date): Promise<User | undefined> {
    const findAppointment = await this.ormRepositoy.findOne({ where: { date } });
    return findAppointment;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepositoy.create(userData);
    await this.ormRepositoy.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepositoy.save(user);
  }
}

export default UserRepository;
