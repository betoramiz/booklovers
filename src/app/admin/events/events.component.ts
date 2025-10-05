import { Component, inject, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { RoutesService } from '../routes.service';
import { Router, RouterLink } from '@angular/router';
import { EventService } from './event.service';
import { EventItemList } from './models/event-item-list';
import { DatePipe, NgStyle } from '@angular/common';
import { StringToTimePipe } from '../../shared/pipes/string-to-time.pipe';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { catchError, filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerComponent } from '../../shared/components/spinner.component';

@Component({
  selector: 'app-events',
  imports: [
    MatRipple,
    RouterLink,
    DatePipe,
    NgStyle,
    StringToTimePipe,
    MatDialogModule,
    MatButton,
    SpinnerComponent
  ],
  template: `
    <section class="admin-section mt-4">
      <div class="eventHeader">
        <button class="button primary full-width flex items-center justify-center" mat-ripple routerLink="create">
          <span class="material-symbols-outlined">calendar_add_on</span>
          Crear Evento
        </button>

        @for (event of futureEvents(); track event.id) {
          <div class="card mt-5 ">
            <header class="title">Proxima Reunion</header>
            <main class="content">
              <div class="w-full h-40 rounded-lg bg-cover bg-center mb-4" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2P14kmuYef2GKs_p708qisiU6J-ZolrgjGVF_qJftHbBSV5iJtQRB9IElO8TZUqZO2bvPe9Vda6FNMlwwPaEdleG-0ywmIXXvrDH05EQeokcugtzxxvRyxcuuKUroeDstSBE1rEIf-Zv-85cf2SJrv5u9Y5ov5dKydaTFFImyiZBb4fNcbYt99ICz7gvBenMkSIND1CWD4QM2P_x9nTjEgt_K32LwDnsJM6MiqJDYCsRRDdS34SnHohLsQw1eYhRsdfRyogDlbxY");'></div>
              <p class="font-medium">{{ event.name }}</p>
              <p class="text-[var(--gray-color-text)] text-sm">{{ event.when | date }}, , {{ event.at_time | stringToTime }}</p>
              <p class="text-[var(--gray-color-text)] text-sm">{{ event.where }}</p>
            </main>
            <footer class="bottom text-[var(--gray-color-text)] space-x-5 flex flex-row justify-end">
              <button [routerLink]="['edit', event.id]" mat-ripple>
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button mat-ripple (click)="deleteEvent(event.id)">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </footer>
          </div>
        }
      </div>

      @if (pastEvents().length > 0) {
        <div class="text-xl">Eventos Anteriores</div>
      }

      @for (event of pastEvents(); track event.id) {
        <div class="card">
          <main class="content">
            <div class="flex flex-row gap-4">
              <div
                class="w-16 h-16 rounded-lg bg-cover bg-center"
                [ngStyle]="{ 'background-image' : defaultImage}">
              </div>
              <div class="flex-col">
                <p class="font-medium">{{ event.name }}</p>
                <p class="text-[var(--gray-color-text)] text-sm">{{ event.where }} </p>
                <p class="text-[var(--gray-color-text)] text-sm">{{ event.when | date }}</p>
              </div>
            </div>
          </main>
        </div>
      }
    </section>

    @if (isLoading()) {
      <club-spinner></club-spinner>/
    }

    <ng-template #deleteDialog>
      <h2 mat-dialog-title>Eliminar evento</h2>
      <mat-dialog-content>
        Estas segura que deseas eliminar este evento?
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button mat-dialog-close>Cancelar</button>
        <button mat-button [mat-dialog-close]="true">Eliminar</button>
      </mat-dialog-actions>
    </ng-template>
  `,
  styles: ``
})
export default class EventsComponent implements OnInit {

    private routeService: RoutesService = inject(RoutesService);
    private eventService: EventService = inject(EventService);
    private readonly dialog = inject(MatDialog);
    private router: Router = inject(Router);
    private snackBar = inject(MatSnackBar);

    @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

    pastEvents = signal<EventItemList[]>([]);
    futureEvents = signal<EventItemList[]>([]);
    isLoading = signal(false);
    defaultImage = 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDQN6f7vYPoIWQRIIwtHB5aKyuOID5imHQ3h6qx3smfk474L-cX2tPEMorGTCGGZS9qCKT8BIHEnoUq-cCZKlpPn6Axz8e7EBVoaHtIMG3yG4QZzX9DBy_wE8cbXrx0DYFRXLBCcEtm3YGfmMGekZKHX_U0z2QeWrIy_UkUAFmptuxUdWOsEK_oi8rUcHCW_BnQ9QCffVa1B78HCBT6GP_BqhxsTu9xq5pQr8_Q6SM9cKjFX6I0KoxX9CZALdaRNcfp41WJqbhVRJ4")';

    async ngOnInit(): Promise<void> {
      this.routeService.setTitle('Eventos');

      const allEvents = await this.eventService.getEvents();

      if(!allEvents.ok) {
        console.error('error', allEvents.error);
      }
      else {
        const pastEvents = allEvents.value.filter(event => new Date(event.when) < new Date());
        const futureEvents = allEvents.value.filter(event => new Date(event.when) >= new Date());

        this.pastEvents.set(pastEvents);
        this.futureEvents.set(futureEvents);
      }
    }

  deleteEvent(eventId: number): void {
      const dialog = this.dialog.open(this.deleteDialog);
      dialog.afterClosed()
        .pipe(
          filter((result) => result === true),
          tap(() => this.isLoading.set(true)),
          switchMap(() => this.eventService.deleteEvent(eventId)),
          tap(() => {
            this.snackBar.open("El evento fue borrado", "Ok", { duration: 3000 });
            this.isLoading.set(false);
            this.futureEvents.update(events => events.filter(event => event.id !== eventId));
          }),
          catchError(e => {
            this.snackBar.open("El evento no se pudo borrar", "Ok", { duration: 3000 });
            return e;
          })
        )
        .subscribe();
  }
}
