import { ResolveFn } from '@angular/router';
import { EventService } from '../event.service';
import { inject } from '@angular/core';
import { getEventByIdResult } from '../models/getById';

export const loadEventResolver: ResolveFn<getEventByIdResult | null> = async (route, state) => {
  const eventService: EventService = inject(EventService);

  const id: number = route.params['id'];
  const result = await eventService.getEventById(id);

  if(!result.ok) {
    return null;
  }

  return result.value;
};
