import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProvidersMonthsAvailabilityService from "./ListMonthsAvailabilityService";
import ListProvidersService from "./ListProvidersService";



let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersMonthsAvailabilityService: ListProvidersMonthsAvailabilityService;

describe('ListProvidersMonthsAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMonthsAvailabilityService = new ListProvidersMonthsAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to the list the months availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0)
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0)
    });

    const availability = await listProvidersMonthsAvailabilityService.execute({ provider_id: 'user', year: 2020, month: 5 });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, availability: true },
      { day: 20, availability: false },
      { day: 21, availability: false },
      { day: 22, availability: true },
    ]));

  });
});

