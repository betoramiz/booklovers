import { Injectable } from '@angular/core';
import BaseService from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { CreateBook } from './types/book';
import { Result } from 'typescript-result';
import { BookItem } from './models/book-item';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService extends BaseService {

  constructor() {
    const { supabaseUrl, supabaseKey } =  environment;
    super(supabaseUrl, supabaseKey);
  }

  async createBook(entity: CreateBook): Promise<Result<string, Error>> {
    const {data, error} = await this.supabaseClient
      .from('book')
      .insert([entity])
      .select('id')
      .single();

    if(error) {
      return Result.error(error);
    }

    return Result.ok(data.id)
  }

  async getBooks(): Promise<Result<BookItem[], Error>> {
    const { data, error } = await this.supabaseClient
      .from('book')
      .select('id, name');

    if(error) {
      return Result.error(error);
    }

    const result: BookItem[] = data?.map(book => {
      return {
        id: book.id,
        name: book.name,
        reviews: 0
      }
    });

    return Result.ok(result);
  }
}
