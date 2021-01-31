import { inject, injectable } from 'tsyringe';

import AppError from '@shared/erros/AppError';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import User from "@modules/users/infra/typeorm/entities/User";
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';


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
    //TODO:TERMINAR
    const x = appointments.filter(appointment => ({ day: 1, available: false }));
    return [{ day: 1, available: false }];
  }
};

export default ListProvidersMonthsAvailabilityService;


