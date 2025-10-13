import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { NotificationService } from '../notification.service';
import { notificationBase, notificationEntity } from '../types/notification';

export const notificationDetailResolver: ResolveFn<notificationEntity | null> = async (route, state) => {
  const service = inject(NotificationService);
  const idParam = route.paramMap.get('id');
  const id = idParam ? Number(idParam) : NaN;

  if (Number.isNaN(id)) {
    return null;
  }

  const result = await service.getById(id);
  if (result.ok) {
    return result.value;
  }
  return null;
};
