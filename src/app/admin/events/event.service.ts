import { Injectable } from '@angular/core';
import BaseService from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { Result } from 'typescript-result';
import { EventItemList } from './models/event-item-list';
import { IEvent } from './models/event';
import { createEventResponse } from './models/createEventResponse';
import { Database } from '../../../database.types';
import { eventInsertPartial, eventsInsert } from './types/events';

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

    if(error) {
      return Result.error(error.message);
    }


    return Result.ok(data);
  }

  async createEvent(event: eventInsertPartial): Promise<Result<createEventResponse, string>> {
    const { data, error } = await this.supabaseClient.from('events').insert([event]).select();

    if(error) {
      return Result.error(error.message)
    }

    return Result.ok({ id:  data[0].id});
  }
}
