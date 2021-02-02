
import { getMongoRepository, MongoRepository, Repository } from 'typeorm';

import INotificationRepository from '@modules/Notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/Notifications/dtos/ICreateNotificationDTO';
import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationRepository {
  private ormRepositoy: MongoRepository<Notification>;

  constructor() {
    this.ormRepositoy = getMongoRepository(Notification,'mongo');
  }

  public async crete({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepositoy.create({ content, recipient_id });

    await this.ormRepositoy.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
