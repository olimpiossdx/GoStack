
import { getRepository, Raw, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppontmentsDTO';
import IFindAllInMontFromProviderDTO from '@modules/appointments/dtos/IFindAllInMontFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepositoy: Repository<Appointment>;

  constructor() {
    this.ormRepositoy = getRepository(Appointment);
  }

  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parseDay = String(day).padStart(2, '0');
    const parseMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepositoy.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`
        )
      }
    });

    return appointments;
  }

  public async findAllInMontFromProvider({ provider_id, month, year }: IFindAllInMontFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepositoy.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`
        )
      }
    });

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepositoy.findOne({ where: { date } });
    return findAppointment;
  }

  public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepositoy.create({ provider_id, user_id, date });
    await this.ormRepositoy.save(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
