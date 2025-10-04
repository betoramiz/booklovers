import { Database } from '../../../../database.types';

export type eventsInsert = Database['public']['Tables']['events']['Row'];
export type eventInsertPartial = Omit<eventsInsert, 'id' | 'created_at' | 'updated_at' | 'image'>;
