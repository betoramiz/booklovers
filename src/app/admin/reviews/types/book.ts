import { Database } from '../../../../database.types';

export type BookBase = Database['public']['Tables']['book']['Row'];

export type BookEntity = Omit<BookBase, 'created_at'>;
export type CreateBook = Omit<BookEntity, 'id'>;
