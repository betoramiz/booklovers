import { eventEntity } from '../types/events';

export type getEventByIdResult = Omit<eventEntity, 'image'>
