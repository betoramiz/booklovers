import { Injectable } from '@angular/core';
import BaseService from '../shared/services/base.service';
import { environment } from '../../environments/environment';
import { Result } from 'typescript-result';
import { EventItem } from './models/event-item';

@Injectable({
  providedIn: 'root'
})
export class PagesService extends BaseService{

  constructor() {
    const { supabaseUrl, supabaseKey } =  environment;
    super(supabaseUrl, supabaseKey);
  }

  async getEvents(): Promise<Result<EventItem[], Error>> {
    const { data, error } = await this.supabaseClient
      .from('events')
      .select('id, name, when, description')
      .order('when', { ascending: false });

    if(error) {
      return Result.error(error);
    }

    const events: EventItem[] = data?.map(item => {
      return {
        id: item.id,
        name: item.name,
        when: item.when,
        description: item.description,
        photos: []
      } as EventItem
    });

    // const result = await this
    //   .supabaseClient
    //   .storage
    //   .from('eventos')
    //   .list()

    return Result.ok(events);
  }
}
