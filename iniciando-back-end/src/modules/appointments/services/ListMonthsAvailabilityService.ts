import { inject, injectable } from 'tsyringe';

import AppError from '@shared/erros/AppError';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import User from "@modules/users/infra/typeorm/entities/User";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getDate, getDaysInMonth } from 'date-fns';


interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProvidersMonthsAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) { }


  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMontFromProvider({ provider_id, month, year });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1);

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
};

export default ListProvidersMonthsAvailabilityService;

