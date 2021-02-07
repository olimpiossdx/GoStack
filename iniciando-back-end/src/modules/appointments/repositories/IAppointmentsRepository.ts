import ICreateAppointmentDTO from "../dtos/ICreateAppontmentsDTO";
import IFindAllInDayFromProviderDTO from "../dtos/IFindAllInDayFromProviderDTO";
import IFindAllInMontFromProviderDTO from "../dtos/IFindAllInMontFromProviderDTO";
import Appointment from "../infra/typeorm/entities/Appointments";

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMontFromProvider(data: IFindAllInMontFromProviderDTO): Promise<Appointment[]>
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>
};
