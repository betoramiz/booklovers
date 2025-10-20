import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { RoutesService } from './routes.service';

@Component({
  selector: 'app-admin',
  imports: [
    RouterOutlet,
    RouterLink,
    MatRipple,
    RouterLinkActive
  ],
  template: `
    <div class="admin-container">
      <header>
        <div class="flex items-center p-4">
          @if (routeService.showBackButton()) {
            <button class="text-gray-600 hover:text-gray-900" (click)="back()">
              <span class="material-symbols-outlined"> arrow_back </span>
            </button>
          }
          <h1 class="text-lg font-bold text-gray-900 flex-1 text-center">{{ routeService.title() }}</h1>
        </div>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <nav>
        <div class="flex justify-around">
          <a class="flex flex-col items-center justify-end gap-1 p-2 nav-link" routerLink="/admin/events" routerLinkActive="active" mat-ripple>
            <span class="material-symbols-outlined"> event </span>
            <p class="text-xs font-medium">Eventos</p>
          </a>
          <a class="flex flex-col items-center justify-end gap-1 p-2 nav-link" routerLink="/admin/notifications" routerLinkActive="active" mat-ripple>
            <span class="material-symbols-outlined"> notifications </span>
            <p class="text-xs font-medium">Notificaciones</p>
          </a>
          <a class="flex flex-col items-center justify-end gap-1 p-2 nav-link" routerLink="/admin/reviews" routerLinkActive="active" mat-ripple>
            <span class="material-symbols-outlined"> grade </span>
            <p class="text-xs font-medium">Reseñas</p>
          </a>
          <a class="flex flex-col items-center justify-end gap-1 p-2 nav-link" routerLink="/admin/settings" routerLinkActive="active" mat-ripple>
            <span class="material-symbols-outlined"> groups </span>
            <p class="text-xs font-medium">Configuracion</p>
          </a>
        </div>
      </nav>
    </div>
  `,
  styles: ``
})
export default class AdminComponent {

  private router: Router = inject(Router);
  routeService: RoutesService = inject(RoutesService);

  back(): void {
    this.router.navigate([this.routeService.goBackRoute()]);
    this.routeService.setGoBackRoute('/admin');
  }
}
