import INotificationRepository from '@modules/Notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/Notifications/dtos/ICreateNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notification';
import { ObjectID } from 'mongodb';

class FakeNotificationsRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async crete({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
