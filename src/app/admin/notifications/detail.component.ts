import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { notificationEntity } from './types/notification';
import { RoutesService } from '../routes.service';
import { Category } from './models/categories';
import { NotificationService } from './notification.service';
import { FormComponent } from './form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail',
  template: `
    <section class="admin-section">
      @if (notification()) {
        <h2 class="title">{{ notification()?.name }}</h2>
        <notification-form
          [categories]="categories()"
          [notification]="notification()"
          (onSaveNotification)="saveNotification($event)"></notification-form>
      } @else {
        <p>No se encontró la notificación.</p>
      }
    </section>
  `,
  imports: [
    FormComponent
  ],
  styles: ``
})
export default class DetailComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private snackBarService = inject(MatSnackBar);
  private routeService: RoutesService = inject(RoutesService);
  private notificationService: NotificationService = inject(NotificationService);

  categories = signal<Category[]>([]);
  notification = signal<notificationEntity|null>(null);

  ngOnInit(): void {
    this.routeService.setTitle('Detalle');
    this.routeService.setGoBackRoute('/admin/notifications');

    this.notification.set(this.activatedRoute.snapshot.data['notification']);
    this.categories.set(this.notificationService.getCategories());
  }

  async saveNotification(notification: notificationEntity) {
    const updateResult = await this.notificationService.updateNotification({
      id: notification.id,
      name: notification.name,
      type: notification.type,
      message: notification.message
    })

    if(updateResult) {
      this.snackBarService.open('Notificación actualizada', 'Cerrar', { duration: 3000 });
      await this.router.navigate(['/admin/notifications']);
    } else {
      this.snackBarService.open('Error al actualizar la notificación', 'Cerrar', { duration: 3000 } );
    }
  }
}
