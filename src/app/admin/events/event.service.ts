import { Injectable } from '@angular/core';
import BaseService from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { Result } from 'typescript-result';
import { EventItemList } from './models/event-item-list';
import { IEvent } from './models/event';
import { createEventResponse } from './models/createEventResponse';

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
      .select('id, name, when, where')
      // .lt('when', new Date());

    if(error) {
      return Result.error(error.message);
    }


    return Result.ok(data);
  }

  async createEvent(eventShema: any): Promise<Result<createEventResponse, string>> {
    const { data, error } = await this.supabaseClient.from('events').insert([eventShema]).select();

    if(error) {
      return Result.error(error.message)
    }

    console.log('data', data);
    return Result.ok({ id:  1});
  }
}
