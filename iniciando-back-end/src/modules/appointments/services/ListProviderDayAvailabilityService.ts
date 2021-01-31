import { inject, injectable } from 'tsyringe';

import AppError from '@shared/erros/AppError';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import User from "@modules/users/infra/typeorm/entities/User";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getDate, getDaysInMonth, getHours } from 'date-fns';


interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) { }


  public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({ provider_id, day, month, year });

    const hourStart = 8;

    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + hourStart);

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });

    return availability;
  }
};

export default ListProviderDayAvailabilityService;


