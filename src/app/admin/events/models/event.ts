import { format } from 'date-fns';

export interface IEvent {
  name: string;
  when: Date;
  // time: Date;
  time: string;
  where: string;
  description: string;
  mapUrl: string|null;
}

export class EventModel {
  static create(name: string, where: string, when: Date, time: string, description: string, mapUrl: string|null = null): IEvent {
    const dateFormatted = format(when, 'yyyy-MM-dd');
    const date = new Date(`${dateFormatted}T${time}Z`);

    return {
      name,
      when,
      time,
      where,
      description,
      mapUrl
    };
  }

  static toDBModel(event: IEvent) {
    return {
      name: event.name,
      when: event.when,
      at_time: event.time,
      where: event.where,
      description: event.description,
      map_url: event.mapUrl
    }
  }
}

