import { Component, inject, OnInit } from '@angular/core';
import { RoutesService } from '../routes.service';
import { MatList, MatListItem } from '@angular/material/list';
import { MatRipple } from '@angular/material/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [
    MatList,
    MatListItem,
    MatRipple,
    RouterLink
  ],
  template: `
    <mat-list>
      <mat-list-item mat-ripple routerLink="members">
        <div class="flex flex-1 justify-between">
          <span>Miembros</span>
          <span class="material-symbols-outlined">chevron_right</span>
        </div>
      </mat-list-item>
      <mat-list-item mat-ripple>
        <div class="flex flex-1 justify-between">
          <span>Sesion</span>
          <span class="material-symbols-outlined">chevron_right</span>
        </div>
      </mat-list-item>
    </mat-list>

<!--    <section class="admin-section mt-4">-->
<!--      <h2 class="title">Sesion</h2>-->
<!--      <button class="button full-width primary">Cerrar sesion</button>-->
<!--    </section>-->
  `,
  styles: ``
})
export default class SettingsComponent implements OnInit {
  private routeService: RoutesService = inject(RoutesService);

  ngOnInit(): void {
    this.routeService.setTitle('Configuracion');
  }
}
