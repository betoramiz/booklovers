import { Database } from '../../../../database.types';

export type eventEntityBase = Database['public']['Tables']['events']['Row'];
export type eventEntity = Omit<eventEntityBase, 'created_at'>

export type eventInsert = Omit<eventEntity, 'id' | 'image'>;
