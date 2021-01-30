import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../providers/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import ShowProfileService from "./ShowProfileServices";

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able the show profile', async () => {
    const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });

    const profile = await showProfileService.execute({ user_id: user.id });
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able the show profile from non-existing user', async () => {
    expect(showProfileService.execute({ user_id: 'non-existing-user-id', })).rejects.toBeInstanceOf(AppError);
  });
});

