import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import ResetPasswordService from "./ResetPasswordService";

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPasswordService = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository);
  });

  it('should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });
    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordService.execute({ password: '123456', token });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('123456');
  });


});
