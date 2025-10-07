import { Injectable } from '@angular/core';
import { Result } from 'typescript-result';
import { NotificationItemBrief } from './models/notification-item-brief';
import BaseService from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { CreateNotificationRequest } from './models/createNotificationRequest';
import { Categories, Category } from './models/categories';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService {

  constructor() {
    const { supabaseUrl, supabaseKey } =  environment;
    super(supabaseUrl, supabaseKey);
  }

  async getAllMessagesForCurrentMontAndAfter(month: number): Promise<Result<NotificationItemBrief[], Error>> {
    const currentDate = new Date();

    const { data, error } = await this.supabaseClient
      .from('notifications')
      .select('id, name, type, created_at')
      .gte('created_at', '2025-01-01');

    if(error) {
      return Result.error(error);
    }

    const result: NotificationItemBrief[] = data?.map(x => ({
      id: x.id,
      title: x.name,
      type: x.type!,
      createdAt: new Date(x.created_at)
    }));

    return Result.ok(result);
  }

  async createNotification(request: CreateNotificationRequest): Promise<Result<number, Error>> {
    const { data, error } = await this.supabaseClient
      .from('notifications')
      .insert([request])
      .select('id')
      .single();

    if(error) {
      return Result.error(error);
    }

    return Result.ok(data.id);
  }

  getCategories(): Category[] {
    return Categories;
  }
}
