import { format, getHours, isBefore, startOfHour } from 'date-fns';

import AppError from '@shared/erros/AppError';

import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';
import INotificationRepository from '@modules/Notifications/repositories/INotificationRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationRepository: INotificationRepository) { }

  public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError("You can only create appointments between 8am and 5pm");
    }

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentsInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    const appointment = await this.appointmentsRepository.create({ provider_id, user_id, date: appointmentDate });

    await this.notificationRepository.crete({
      recipient_id: provider_id,
      content: `Novo agendmaento para dia ${dateFormatted}`
    });

    return appointment;
  }
}

export default CreateAppointmentService;
