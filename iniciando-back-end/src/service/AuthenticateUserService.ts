import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../models/User";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {

    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorret email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorret email/password combination.');
    }

    const token = sign({}, ' 2eccf18a7fa2854163ecb01e25579049', { subject: user.id, expiresIn: '1d' });

    return { user, token };
  }
};

export default AuthenticateUserService;