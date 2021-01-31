import AppError from "@shared/erros/AppError";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "./CreateAppointmentService";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 4, 10, 12).getTime())

    const appointment = await createAppointment.execute({ date: new Date(2021, 4, 10, 13), provider_id: 'provider-id', user_id: 'user-id' });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 10, 8);

    await createAppointment.execute({ date: appointmentDate, provider_id: 'provider-id', user_id: 'user-id' });

    await expect(createAppointment.execute({ date: appointmentDate, provider_id: 'provider-id', user_id: 'user-id' })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two appointments on the past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 4, 10, 12).getTime())

    await expect(createAppointment.execute({ date: new Date(2021, 4, 10, 11), provider_id: 'provider-id', user_id: 'user-id' })).rejects.toBeInstanceOf(AppError);
  });


  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 10, 12);

    await createAppointment.execute({ date: appointmentDate, provider_id: 'provider-id', user_id: 'user-id' });

    await expect(createAppointment.execute({ date: appointmentDate, provider_id: 'provider-id', user_id: 'user-id' })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two appointments with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 4, 10, 14).getTime())

    await expect(createAppointment.execute({ date: new Date(2021, 4, 10, 13), provider_id: 'user-id', user_id: 'user-id' })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two appointment before 8am and afeter 5pm ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 4, 10, 18).getTime())

    await expect(createAppointment.execute({ date: new Date(2021, 4, 11, 7), provider_id: 'provider-id', user_id: 'user-id' })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointment.execute({ date: new Date(2021, 4, 11, 18), provider_id: 'provider-id', user_id: 'user-id' })).rejects.toBeInstanceOf(AppError);
  });

});
