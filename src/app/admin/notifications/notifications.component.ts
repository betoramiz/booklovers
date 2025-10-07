import { Component, inject, OnInit, signal } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { RoutesService } from '../routes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationForm } from './models/notification-form';
import { DatePipe, NgClass } from '@angular/common';
import { NotificationService } from './notification.service';
import { MatSelectModule } from '@angular/material/select';
import { Categories, Category } from './models/categories';
import { NotificationItemBrief } from './models/notification-item-brief';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notifications',
  imports: [
    MatRipple,
    ReactiveFormsModule,
    NgClass,
    MatSelectModule,
    DatePipe
  ],
  template: `
    <section class="admin-section">
      <h2 class="title">Crear Notificacion</h2>
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
          Crear
        </button>
      </form>
    </section>
    <section class="admin-section">
      <h2 class="title">Historial de notificaciones</h2>
      <div class="space-y-3">
        @for (notification of notifications(); track notification) {
          <div class="flex items-center gap-4 p-3 rounded-lg border border-gray-200">
            @if (notification.type === 1) {
              <div class="flex items-center justify-center rounded-full bg-blue-100 shrink-0 size-12 text-blue-600">
                  <span class="material-symbols-outlined"> book </span>
              </div>
            } @else if (notification.type === 2) {
              <div class="flex items-center justify-center rounded-full bg-green-100 shrink-0 size-12 text-green-600">
                <span class="material-symbols-outlined"> celebration </span>
              </div>
            }
            <div class="flex-grow">
              <p class="text-gray-900 font-semibold">{{ notification.title }}</p>
              <p class="text-gray-500 text-sm">Creado: {{ notification.createdAt | date }}</p>
            </div>
            <span class="text-gray-400 material-symbols-outlined"> chevron_right </span>
          </div>
        }
      </div>
    </section>
  `,
  styles: ``
})
export default class NotificationsComponent implements OnInit{

  private routeService: RoutesService = inject(RoutesService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private notificationService: NotificationService = inject(NotificationService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private currentMonth = new Date().getMonth() + 1;

  notificationForm: FormGroup<NotificationForm> = this.createForm();

  categories = signal<Category[]>([]);
  notifications = signal<NotificationItemBrief[]>([]);

  ngOnInit(): void {
    this.routeService.setTitle('Notificaciones');
    this.categories.set(this.notificationService.getCategories());
    const notifications = this.activatedRoute.snapshot.data['loadNotificationsResolver'];
    this.notifications.set(notifications);
  }

  async onSave(): Promise<void> {
    if (this.notificationForm.invalid) {
      return;
    }

    const { name, message, type } = this.notificationForm.value;

    const result = await this.notificationService.createNotification({
      name: name!,
      message: message!,
      type: type!
    });

    if (!result.ok) {
      console.error('Error al crear la notificacion', result.error);
    }
    else {
      this.notificationForm.reset();
       const notifications = await this.notificationService.getAllMessagesForCurrentMontAndAfter(this.currentMonth);
       this.notifications.set(notifications.value || []);
    }
  }

  private createForm(): FormGroup<NotificationForm> {
    return this.formBuilder.nonNullable.group<NotificationForm>({
      name: this.formBuilder.nonNullable.control('', Validators.required),
      message: this.formBuilder.nonNullable.control('', Validators.required),
      type: this.formBuilder.control(null, Validators.required),
    });
  }

  protected readonly Categories = Categories;
}
