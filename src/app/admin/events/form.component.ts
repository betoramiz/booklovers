import { Component, inject, OnInit, signal } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateEventForm } from './models/create-event-form';
import { NgClass } from '@angular/common';
import { EventService } from './event.service';
import { SpinnerComponent } from '../../shared/components/spinner.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { eventInsert, eventUpdate } from './types/events';
import { getEventByIdResult } from './models/getById';
import { format } from 'date-fns';

@Component({
  selector: 'event-form',
  imports: [
    MatRipple,
    ReactiveFormsModule,
    NgClass,
    SpinnerComponent,
    MatSnackBarModule
  ],
  template: `
    @if (isLoading()) {
      <club-spinner></club-spinner>
    }
    <form [formGroup]="eventFormGroup" (ngSubmit)="onSubmit()">
      <div class="form-item">
        <label for="eventName">Nombre del Evento</label>
        <input type="text" id="eventName" formControlName="name" class="form-item-input"
               placeholder="ej. Libro: El Jardin Secreto">
        @if (eventFormGroup.controls.name.hasError('required') && eventFormGroup.controls.name.touched) {
          <span class="text-red-600 text-sm">El nombre del evento es requerido</span>
        }
      </div>

      <div class="grid grid-cols-2 gap-8">
        <div class="form-item">
          <label for="date">Fecha</label>
          <input type="date" formControlName="when" id="date" min="today" class="form-item-input">
          @if (eventFormGroup.controls.when.hasError('required') && eventFormGroup.controls.when.touched) {
            <span class="text-red-600 text-sm">La fecha es requerida</span>
          }
        </div>


        <div class="form-item">
          <label for="time">Hora</label>
          <input type="time" formControlName="time" id="time" class="form-item-input">
          @if (eventFormGroup.controls.time.hasError('required') && eventFormGroup.controls.time.touched) {
            <span class="text-red-600 text-sm">La hora del evento es requerida</span>
          }
        </div>
      </div>

      <div class="form-item">
        <label for="location">Lugar</label>
        <input type="text" formControlName="where" id="location" class="form-item-input">
        @if (eventFormGroup.controls.where.hasError('required') && eventFormGroup.controls.where.touched) {
          <span class="text-red-600 text-sm">El lugar es requerido</span>
        }
      </div>

      <div class="form-item">
        <label for="map">Mapa</label>
        <input type="url" id="map" formControlName="mapUrl" class="form-item-input" placeholder="ulr de google maps">
      </div>

      <div class="form-item">
        <label for="description">Descripcion</label>
        <textarea class="form-item-input" formControlName="description" id="description" cols="30" rows="4"></textarea>
        @if (eventFormGroup.controls.description.hasError('required') && eventFormGroup.controls.description.touched) {
          <span class="text-red-600 text-sm">La descripcion del evento es requerida</span>
        }
      </div>

      <button type="submit"
              class="button primary full-width flex items-center justify-center tracking-widest"
              [disabled]="eventFormGroup.invalid"
              [ngClass]="{ 'disabled' : eventFormGroup.invalid }"
              mat-ripple [matRippleDisabled]="eventFormGroup.invalid">
        <span class="material-symbols-outlined">add</span>
        @if (isEditMode()) {
          Editar
        } @else {
          Crear
        }
      </button>
    </form>
  `,
  styles: ``
})
export class FormComponent implements OnInit {

  private eventService: EventService = inject(EventService);
  private router: Router = inject(Router);
  private activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  eventResolverData: getEventByIdResult = this.activeRoute.snapshot.data['loadedEvents'];
  formBuilder: FormBuilder = inject(FormBuilder);
  eventFormGroup: FormGroup<CreateEventForm> = this.createFormGroup();
  isLoading = signal(false);
  isEditMode = signal(false);

  ngOnInit(): void {
    if(this.eventResolverData) {
      this.isEditMode.set(true);
      this.patchEventFormGroup(this.eventResolverData);
    }
  }

  public async onSubmit(): Promise<void> {
    if(this.eventFormGroup.invalid) {
      return;
    }
    this.isLoading.set(true);

    const { name, when, time, where, description, mapUrl } = this.eventFormGroup.value;

    if(this.isEditMode()) {
      const event: eventUpdate = {
        name: name!,
        when: when!,
        at_time: time!,
        where: where!,
        description: description!,
        is_disabled: false,
        map_url: mapUrl!,
        image: null
      };
      await this.editEvent(this.eventResolverData.id, event);
    } else {
      const dbSchema: eventInsert = {
        name: name!,
        when: when!,
        where: where!,
        at_time: time!,
        description: description!,
        is_disabled: false,
        map_url: mapUrl || null,
      };
      await this.createEvent(dbSchema);
    }
  }

  private createFormGroup(): FormGroup<CreateEventForm> {
    return this.formBuilder.group<CreateEventForm>({
      name: this.formBuilder.nonNullable.control('', Validators.required),
      when: this.formBuilder.nonNullable.control(format(new Date(), 'yyyy-MM-dd'), Validators.required),
      time: this.formBuilder.nonNullable.control('', Validators.required),
      where: this.formBuilder.nonNullable.control('', Validators.required),
      description: this.formBuilder.nonNullable.control('', Validators.required),
      mapUrl: this.formBuilder.control(null)
    });
  }

  private patchEventFormGroup(event: getEventByIdResult): void {
    const { name, when, at_time, where, description, map_url } = event;
    this.eventFormGroup.patchValue({
      name,
      when: when,
      time: at_time,
      where,
      description,
      mapUrl: map_url
    });
  }

  private async createEvent(event: eventInsert) {
    const result = await this.eventService.createEvent(event);

    if(result.isError()) {
      this.isLoading.set(false);
      console.error('Error al crear el evento', result.error);
      this.snackBar.open('Error al crear el evento', 'Cerrar', { duration: 5000 });
    } else {
      this.isLoading.set(false);
      this.snackBar.open('Evento creado exitosamente', 'Cerrar', { duration: 3000 })
      this.router.navigate(['/admin/events']);
    }
  }

  private async editEvent(eventId: number, event: eventUpdate) {
    const result = await this.eventService.editEvent(eventId, event);

    if(!result.ok) {
      this.isLoading.set(false);
      this.snackBar.open('Error al acualizar el evento', 'Cerrar', { duration: 5000 });
    } else {
      this.isLoading.set(false);
      this.snackBar.open('Evento editado exitosamente', 'Cerrar', { duration: 3000 })
      this.router.navigate(['/admin/events']);
    }
  }
}
