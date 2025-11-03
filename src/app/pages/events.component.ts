import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventItem } from './models/event-item';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  imports: [
    DatePipe
  ],
  template: `
    <div class="p-6 h-full">
      <h2 class="text-3xl font-bold mb-3">Eventos</h2>
      <p class="text-base font-normal text-justify">
        Seccion de eventos...
      </p>

      @for (event of events(); track event.id) {
        <div class="mt-6">
          <h2 class="text-xl font-bold mb-3">{{ event.name }}</h2>
          <p class="text-gray-400 mb-2 font-light">{{ event.when | date }}</p>
          <p class="text-base font-normal text-justify">
            {{ event.description }}
          </p>
          <img src="./nada" alt="">
        </div>
      }
    </div>


  `,
  styles: ``
})
export default class EventsComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  events = signal<EventItem[]>([]);

  constructor() {
    const events = this.route.snapshot.data['events'];
    this.events.set(events);
  }

}
