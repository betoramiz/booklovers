import { Component, inject, OnInit, signal } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { RoutesService } from '../routes.service';
import { RouterLink } from '@angular/router';
import { EventService } from './event.service';
import { EventItemList } from './models/event-item-list';
import { DatePipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [
    MatRipple,
    RouterLink,
    DatePipe,
    NgStyle
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
              <p class="font-medium">Libro: El jardin Secreto</p>
              <p class="text-[var(--gray-color-text)] text-sm">Agosto 20, 2025. 7:00 pm</p>
              <p class="text-[var(--gray-color-text)] text-sm">Cafe Iguanas</p>
            </main>
            <footer class="bottom text-[var(--gray-color-text)] space-x-5 flex flex-row justify-end">
              <button routerLink="edit/1">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button>
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
                <p class="text-[var(--gray-color-text)] text-sm">{{ event.where }}</p>
                <p class="text-[var(--gray-color-text)] text-sm">{{ event.when | date }}</p>
              </div>
            </div>
          </main>
        </div>
      }
    </section>
  `,
  styles: ``
})
export default class EventsComponent implements OnInit {

    private routeService: RoutesService = inject(RoutesService);
    private eventService: EventService = inject(EventService);

    pastEvents = signal<EventItemList[]>([]);
    futureEvents = signal<EventItemList[]>([]);
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
}
