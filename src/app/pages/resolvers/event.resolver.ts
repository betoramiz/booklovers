import { ResolveFn } from '@angular/router';
import { PagesService } from '../pages.service';
import { inject } from '@angular/core';
import { EventItem } from '../models/event-item';

export const eventResolver: ResolveFn<EventItem[]> = async (route, state) => {
  const service: PagesService = inject(PagesService);

  const events = await service.getEvents();

  if(events.error) {
    return [];
  }

  return events.value;
};
