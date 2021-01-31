
import { uuid } from 'uuidv4';
import { getMonth, getYear, isEqual } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppontmentsDTO';
import Appointment from '../../infra/typeorm/entities/Appointments';
import IFindAllInMontFromProviderDTO from '@modules/appointments/dtos/IFindAllInMontFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(appointment => isEqual(appointment.date, date));
    return appointment;
  }

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });
    this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInMontFromProvider({ provider_id, month, year }: IFindAllInMontFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      );
    });

    return appointments;
  }
}

export default FakeAppointmentsRepository;
