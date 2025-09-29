import { Injectable } from '@angular/core';
import BaseService from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { Result } from 'typescript-result';
import { EventItemList } from './models/event-item-list';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService{

  constructor() {
    const { supabaseUrl, supabaseKey } =  environment;
    super(supabaseUrl, supabaseKey);
  }

  async getEvents(): Promise<Result<EventItemList[], string>> {
    const { data, error } = await this.supabaseClient
      .from('events')
      .select('id, name, when, where');

    if(error) {
      return Result.error(error.details);
    }


    return Result.ok(data);
  }
}
