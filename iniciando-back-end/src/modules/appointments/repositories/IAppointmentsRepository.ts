import ICreateAppointmentDTO from "../dtos/ICreateAppontmentsDTO";
import Appointment from "../infra/typeorm/entities/Appointments";

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
};
