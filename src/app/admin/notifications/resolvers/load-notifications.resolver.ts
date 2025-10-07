import { ResolveFn } from '@angular/router';
import { NotificationService } from '../notification.service';
import { inject } from '@angular/core';
import { NotificationItemBrief } from '../models/notification-item-brief';

export const loadNotificationsResolver: ResolveFn<NotificationItemBrief[]> = async (route, state) => {
  const service: NotificationService = inject(NotificationService);

  const month = new Date().getMonth() + 1;
  const notifications = await service.getAllMessagesForCurrentMontAndAfter(month);

  if(notifications.ok) {
    return notifications.value;
  }
  return [];
};
