import { Injectable } from '@angular/core';
import BaseService from '../../shared/services/base.service';
import { environment } from '../../../environments/environment';
import { Result } from 'typescript-result';
import { EventItemList } from './models/event-item-list';
import { createEventResponse } from './models/createEventResponse';
import { eventInsert, eventUpdate } from './types/events';
import { getEventByIdResult } from './models/getById';
import { PhotoUrl } from './models/photoUrl';
import { UploadFileResponse } from './models/uploadFileResponse';
import { photoInsert } from '../types/photos';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseService{

  constructor() {
    const { supabaseUrl, supabaseKey } =  environment;
    super(supabaseUrl, supabaseKey);
  }

  async getEvents(): Promise<Result<EventItemList[], string>> {
    const { data, error } = await this.supabaseClient
      .from('events')
      .select('id, name, when, where, at_time, is_disabled')
      .order('when', { ascending: false });

    if(error) {
      return Result.error(error.message);
    }


    return Result.ok(data);
  }

  async getEventById(eventId: number): Promise<Result<getEventByIdResult, Error>> {
    const { data, error } = await this.supabaseClient
      .from('events')
      .select('id, name, when, where, at_time, description, is_disabled, map_url, public_url')
      .eq('id', eventId)
      .single();

    if(error) {
      return Result.error(error);
    }
    if(!data) {
      return Result.error(new Error('Evento no encontrado'));
    }

    const event: getEventByIdResult = {...data};
    return Result.ok(event)
  }

  async createEvent(event: eventInsert): Promise<Result<createEventResponse, string>> {
    const { data, error } = await this.supabaseClient.from('events').insert([event]).select();

    if(error) {
      return Result.error(error.message)
    }

    return Result.ok({ id:  data[0].id});
  }

  async editEvent(eventId: number, event: eventUpdate): Promise<Result<boolean, Error>> {
    const { error } = await this.supabaseClient
      .from('events')
      .update({...event})
      .eq('id', eventId)
      .select();

    if (error) {
      return Result.error(error);
    }

    return Result.ok(true);
  }

  async deleteEvent(eventId: number): Promise<Result<boolean, Error>> {
    const { error } = await this.supabaseClient
      .from('events')
      .delete()
      .eq('id', eventId)
      .select();

    if (error) {
      return Result.error(error);
    }

    return Result.ok(true);
  }

  async disableEvent(eventId: number): Promise<Result<boolean, Error>> {
    const { error } = await this.supabaseClient
      .from('events')
      .update({ is_disabled: true })
      .eq('id', eventId);

    if(error) {
      return Result.error(error);
    }

    return Result.ok(true);
  }

  async addImageUrl(photo: photoInsert): Promise<Result<boolean, Error>> {
    const { data, error } = await this.supabaseClient
      .from('photos')
      .insert([photo])
      .select();

    if(error) {
      return Result.error(error);
    }

    return Result.ok(true);
  }

  async enableEvent(eventId: number): Promise<Result<boolean, Error>> {
    const { error } = await this.supabaseClient
      .from('events')
      .update({ is_disabled: false })
      .eq('id', eventId);

    if(error) {
      return Result.error(error);
    }

    return Result.ok(true);
  }

  async uploadFile(filename: string, file: File): Promise<Result<UploadFileResponse, Error>> {
    const { data, error } = await this.supabaseClient
      .storage
      .from('eventos')
      .upload(filename, file);

    if(error) {
      return Result.error(error);
    }

    const urlResult = this.supabaseClient.storage.from('eventos').getPublicUrl(filename);

    const result: UploadFileResponse = {
      fileId: data?.id,
      url: urlResult.data.publicUrl
    }

    return Result.ok(result);
  }

  async getFiles(folder: string): Promise<Result<PhotoUrl[], Error>> {
    const { data, error } = await this.supabaseClient
      .storage
      .from('eventos')
      .list(folder, { limit: 5 });

    if(error) {
      console.log('error', error);
      return Result.error(error);
    }
    if(data == null) {
      return Result.error(new Error('No se encontraron archivos'));
    }

    const urls = data?.map(file => `${folder}/${file.name}`);

    const result = await this.supabaseClient
      .storage
      .from('eventos')
      .createSignedUrls(urls, 600);

    if(result.error) {
      return Result.error(result.error);
    }

    const signedUrls = result.data?.map(photo => {
      return {
        signedUrl: photo.signedUrl,
        path: photo.path?.split('/').at(-1)
      } as PhotoUrl;
    });

    return Result.ok(signedUrls!);
  }

  async deleteFile(folder: string, fileName: string): Promise<Result<boolean, Error>> {
    const { error } = await this.supabaseClient
      .storage
      .from('eventos')
      .remove([`${folder}/${fileName}`]);

    if(error) {
      return Result.error(error);
    } else {
      return Result.ok(true);
    }
  }

}
