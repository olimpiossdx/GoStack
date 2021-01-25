
import { getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppontmentsDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepositoy: Repository<Appointment>;

  constructor() {
    this.ormRepositoy = getRepository(Appointment);
  }
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepositoy.findOne({ where: { date } });
    return findAppointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepositoy.create({ provider_id, date });
    await this.ormRepositoy.save(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
