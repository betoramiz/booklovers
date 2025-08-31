import { Component, inject, OnInit } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { RoutesService } from '../routes.service';

@Component({
  selector: 'app-notifications',
  imports: [
    MatRipple
  ],
  template: `
    <section class="admin-section">
      <h2 class="title">Crear Notificacion</h2>
      <form>
        <div class="form-item">
          <label class="sr-only" for="notification-title">Titulo</label>
          <input class="form-item-input" id="notification-title" placeholder="Titulo" />
        </div>
        <div class="form-item">
          <label class="sr-only" for="notification-message">Mensaje</label>
          <textarea class="form-item-input" id="notification-message" placeholder="Mensaje" rows="4"></textarea>
        </div>
        <button type="button" class="button primary full-width" mat-ripple>Crear</button>
      </form>
    </section>
    <section class="admin-section">
      <h2 class="title">Historial de notificaciones</h2>
      <div class="space-y-3">
        <div class="flex items-center gap-4 p-3 rounded-lg border border-gray-200">
          <div class="flex items-center justify-center rounded-full bg-blue-100 shrink-0 size-12 text-blue-600">
            <span class="material-symbols-outlined"> book </span>
          </div>
          <div class="flex-grow">
            <p class="text-gray-900 font-semibold">Libro del mes</p>
            <p class="text-gray-500 text-sm">Creado: Enero 15, 2025</p>
          </div>
          <span class="text-gray-400 material-symbols-outlined"> chevron_right </span>
        </div>
        <div class="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200">
          <div class="flex items-center justify-center rounded-full bg-green-100 shrink-0 size-12 text-green-600">
            <span class="material-symbols-outlined"> celebration </span>
          </div>
          <div class="flex-grow">
            <p class="text-gray-900 font-semibold">Cumpleaños Julio</p>
            <p class="text-gray-500 text-sm">Creado: julio 2, 2025</p>
          </div>
          <span class="text-gray-400 material-symbols-outlined"> chevron_right </span>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export default class NotificationsComponent implements OnInit{

  private routeService: RoutesService = inject(RoutesService);

  ngOnInit(): void {
    this.routeService.setTitle('Notificaciones');
  }
}
