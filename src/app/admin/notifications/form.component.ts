import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationForm } from './models/notification-form';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Category } from './models/categories';
import { NgClass } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { notificationEntity } from './types/notification';

@Component({
  selector: 'notification-form',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    MatRipple,
    NgClass
  ],
  template: `
    <form [formGroup]="notificationForm" (ngSubmit)="onSave()">
      <div class="form-item">
        <label class="sr-only" for="notification-title">Titulo</label>
        <input formControlName="name" class="form-item-input" id="notification-title" placeholder="Titulo" />
        @if (notificationForm.controls.name.touched && notificationForm.controls.name.hasError('required')) {
          <span class="error">Titulo requerido</span>
        }
      </div>
      <div class="form-item">
        <label class="sr-only" for="notification-message">Mensaje</label>
        <textarea formControlName="message" class="form-item-input" id="notification-message" placeholder="Mensaje"
                  rows="4"></textarea>
        @if (notificationForm.controls.message.touched && notificationForm.controls.message.hasError('required')) {
          <span class="error">El mensaje de la notificacion es requerido</span>
        }
      </div>

      <div class="form-item">
        <mat-label class="sr-only">Categoria</mat-label>
        <mat-form-field class="w-full">
          <mat-select formControlName="type">
            @for (category of categories(); track category) {
              <mat-option [value]="category.id">{{ category.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        @if (notificationForm.controls.type.touched && notificationForm.controls.type.hasError('required')) {
          <span class="error">La categoria es requerida</span>
        }
      </div>

      <button
        type="submit"
        class="button primary full-width"
        [disabled]="notificationForm.invalid"
        mat-ripple
        [matRippleDisabled]="notificationForm.invalid"
        [ngClass]="{ 'disabled' : notificationForm.invalid }">
        {{ buttonTitle() }}
      </button>
    </form>
  `,
  styles: ``
})
export class FormComponent implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);

  onSaveNotification = output<notificationEntity>();
  buttonTitle = signal<string>('Crear');
  categories = input.required<Category[]>();
  notification = input<notificationEntity|null>(null);

  notificationForm!: FormGroup<NotificationForm>;

  ngOnInit(): void {
    if(this.notification()) {
      this.buttonTitle.set('Editar');
    }

    this.notificationForm = this.createForm(this.notification());
  }

  onSave(): void {
    if(this.notificationForm.invalid) {
      return;
    }

    this.onSaveNotification.emit({
      id: this.notification()?.id || 0,
      name: this.notificationForm.value.name!,
      type: this.notificationForm.value.type!,
      message: this.notificationForm.value.message!
    });
  }

  private createForm(notification: notificationEntity | null): FormGroup<NotificationForm> {
    const form = this.formBuilder.nonNullable.group<NotificationForm>({
      name: this.formBuilder.nonNullable.control('', Validators.required),
      message: this.formBuilder.nonNullable.control('', Validators.required),
      type: this.formBuilder.control(null, Validators.required),
    });

    if(notification) {
      form.patchValue({
        name: notification.name,
        message: notification.message,
        type: notification.type
      })
    }

    return form;
  }
}
