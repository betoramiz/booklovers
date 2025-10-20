import { Injectable } from '@angular/core';
import BaseService from '../shared/services/base.service';
import { environment } from '../../environments/environment';
import { Result } from 'typescript-result';
import { EventItemList } from '../admin/events/models/event-item-list';

@Injectable({
  providedIn: 'root'
})
export class PagesService extends BaseService{

  constructor() {
    const { supabaseUrl, supabaseKey } =  environment;
    super(supabaseUrl, supabaseKey);
  }

  async getEvents(): Promise<Result<EventItemList[], string>> {
    const { data, error } = await this.supabaseClient
      .from('events')
      .select('id, name, when, where, at_time')
      .order('when', { ascending: false });

    if(error) {
      return Result.error(error.message);
    }


    return Result.ok(data);
  }
}
