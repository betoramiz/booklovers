import { Database } from '../../../database.types';

export type photoEntityBase = Database['public']['Tables']['photos']['Row'];

export type photoEntity = Omit<photoEntityBase, 'created_at'>;
export type photoInsert = Omit<photoEntity, 'id'>;
