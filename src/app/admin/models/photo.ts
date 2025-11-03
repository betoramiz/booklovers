import { photoInsert } from '../types/photos';

export class Photo {
  createEventPhoto(eventId: number, url: string): photoInsert {
    return {
      event_id: eventId,
      url: url,
      'book _id': null,
    }
  }
}
