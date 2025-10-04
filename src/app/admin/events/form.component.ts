import { Component, inject, signal } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateEventForm } from './models/create-event-form';
import { NgClass } from '@angular/common';
import { EventModel } from './models/event';
import { EventService } from './event.service';
import { SpinnerComponent } from '../../shared/components/spinner.component';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
        <input type="text" id="eventName" formControlName="name" class="form-item-input" placeholder="ej. Libro: El Jardin Secreto">
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
        Crear
      </button>
    </form>
  `,
  styles: ``
})
export class FormComponent {

  private eventService: EventService = inject(EventService);
  private router: Router = inject(Router);
  private snackBar = inject(MatSnackBar);

  formBuilder: FormBuilder = inject(FormBuilder);
  eventFormGroup: FormGroup<CreateEventForm> = this.createFormGroup();
  isLoading = signal(false);

  public async onSubmit(): Promise<void> {
    if(this.eventFormGroup.invalid) {
      return;
    }
    this.isLoading.set(true);

    const { name, when, time, where, description, mapUrl } = this.eventFormGroup.value;
    const event = EventModel.create(name!, where!, when!, time!, description!, mapUrl);
    const dbSchema = EventModel.toDBModel(event);
    const result = await this.eventService.createEvent(dbSchema);

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

  private createFormGroup(): FormGroup<CreateEventForm> {
    return this.formBuilder.group<CreateEventForm>({
      name: this.formBuilder.nonNullable.control('', Validators.required),
      when: this.formBuilder.nonNullable.control(new Date(), Validators.required),
      time: this.formBuilder.nonNullable.control('', Validators.required),
      where: this.formBuilder.nonNullable.control('', Validators.required),
      description: this.formBuilder.nonNullable.control('', Validators.required),
      mapUrl: this.formBuilder.control(null)
    });
  }
}
