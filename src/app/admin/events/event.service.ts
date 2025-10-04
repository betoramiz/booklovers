import { Injectable } from '@angular/core';
import BaseService from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { Result } from 'typescript-result';
import { EventItemList } from './models/event-item-list';
import { createEventResponse } from './models/createEventResponse';
import { eventEntity, eventInsert } from './types/events';
import { getEventByIdResult } from './models/getById';

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
      .select('id, name, when, where, at_time')

    if(error) {
      return Result.error(error.message);
    }


    return Result.ok(data);
  }

  async getEventById(eventId: number): Promise<Result<getEventByIdResult, Error>> {
    const { data, error } = await this.supabaseClient
      .from('events')
      .select('id, name, when, where, at_time, description, map_url')
      .eq('id', eventId)
      .single();

    if(error) {
      return Result.error(error);
    }
    if(!data) {
      return Result.error(new Error('Evento no encontrado'));
    }

    const event: getEventByIdResult = {...data};
    return Result.ok(event)
  }

  async createEvent(event: eventInsert): Promise<Result<createEventResponse, string>> {
    const { data, error } = await this.supabaseClient.from('events').insert([event]).select();

    if(error) {
      return Result.error(error.message)
    }

    return Result.ok({ id:  data[0].id});
  }

  async editEvent(event: eventEntity): Promise<Result<boolean, Error>> {
    const { data, error } = await this.supabaseClient
      .from('events')
      .update(event)
      .eq('id', event.id)
      .select();

    if (error) {
      return Result.error(error);
    }

    return Result.ok(true);
  }
}
