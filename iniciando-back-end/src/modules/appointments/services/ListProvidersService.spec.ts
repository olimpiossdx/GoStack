import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListProvidersService from "./ListProvidersService";

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to the list providers', async () => {

    const user1 = await fakeUsersRepository.create({ name: 'John Doe', email: 'johndoe@example.com', password: '54326587' });
    const user2 = await fakeUsersRepository.create({ name: 'John tre', email: 'johntre@example.com', password: '54326587' });

    const loggedUser = await fakeUsersRepository.create({ name: 'John for', email: 'johnfor@example.com', password: '54326587' });

    const providers = await listProvidersService.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});

