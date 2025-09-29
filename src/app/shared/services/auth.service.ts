import { Injectable } from '@angular/core';
import BaseService from './base.service';
import { environment } from '../../../environments/environment';
import { AuthTokenResponsePassword } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  constructor() {
    const { supabaseUrl, supabaseKey } =  environment;
    super(supabaseUrl, supabaseKey);
  }

  loginWithPassword(user: string, password: string): Promise<AuthTokenResponsePassword> {
    return this.supabaseClient
      .auth
      .signInWithPassword({ email: user, password: password });
  }

  async isAuthenticated(): Promise<boolean> {
    const { data, error } = await this.supabaseClient.auth.getSession();
    return data.session != null;
  }
}
