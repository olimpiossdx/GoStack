import ICreateNotificationDTO from "../dtos/ICreateNotificationDTO";
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationRepository {
  crete(data: ICreateNotificationDTO): Promise<Notification>;
};
