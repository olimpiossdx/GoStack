import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "../dtos/IFindAllProvidersDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
};
