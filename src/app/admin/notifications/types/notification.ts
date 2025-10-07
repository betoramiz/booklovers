import { Database } from '../../../../database.types';

export type notificationBase = Database['public']['Tables']['notifications']['Row'];

export type notificationEntity = Omit<notificationBase, 'created_at'>;
