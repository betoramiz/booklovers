import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

export default class BaseService {

  supabaseClient: SupabaseClient;

  constructor(url: string, key: string) {
    this.supabaseClient = createClient<Database>(url, key);
  }
}
