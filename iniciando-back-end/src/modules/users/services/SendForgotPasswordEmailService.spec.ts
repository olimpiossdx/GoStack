import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";

describe('SendForgotPassworEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUsersRepository,fakeMailProvider);

    const user = await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    await sendForgotPasswordEmailService.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

});
