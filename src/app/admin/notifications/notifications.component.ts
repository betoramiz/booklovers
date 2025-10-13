import { Component, inject, OnInit, signal } from '@angular/core';
import { RoutesService } from '../routes.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { NotificationItemBrief } from './models/notification-item-brief';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormComponent } from './form.component';
import { NotificationService } from './notification.service';
import { Category } from './models/categories';

@Component({
  selector: 'app-notifications',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    DatePipe,
    RouterLink,
    FormComponent
  ],
  template: `
    <section class="admin-section">
      <h2 class="title">Crear Notificacion</h2>
      <notification-form [categories]="categories()"></notification-form>
    </section>
    <section class="admin-section">
      <h2 class="title">Historial de notificaciones</h2>
      <div class="space-y-3">
        @for (notification of notifications(); track notification) {
          <div class="flex items-center gap-4 p-3 rounded-lg border border-gray-200" [routerLink]="['detail', notification.id]">
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
  private notificationService: NotificationService = inject(NotificationService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private currentMonth = new Date().getMonth() + 1;


  categories = signal<Category[]>([]);
  notifications = signal<NotificationItemBrief[]>([]);

  async ngOnInit(): Promise<void> {
    this.routeService.setTitle('Notificaciones');

    this.categories.set(this.notificationService.getCategories());
    const notifications = await this.notificationService.getAllMessagesForCurrentMontAndAfter(this.currentMonth)
    if(notifications.ok) {
      this.notifications.set(notifications.value);
    }
  }
}
