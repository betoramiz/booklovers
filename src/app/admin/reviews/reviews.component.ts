import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { RoutesService } from '../routes.service';
import { MatRipple } from '@angular/material/core';
import 'iconify-icon';
import { StartRateComponent } from '../../shared/components/start-rate.component';

@Component({
  selector: 'app-reviews',
  imports: [
    MatRipple,
    StartRateComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section class="admin-section">
      <h2 class="title">Cadaver Exquisitio</h2>
      <div class="flex flex-col border border-gray-300 rounded-xl p-2 bg-[#f5f5dc]">
        <section class="flex flex-row justify-between mb-3">
          <div class="font-semibold">Beto Ramirez</div>
          <start-rate [rate]="3"></start-rate>
        </section>
        <p class="text-gray-500 text-justify font-medium mb-4">Muy buena libro, me gusto por que lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
        <div class="flex flex-row justify-between">
          <button type="button" class="button primary-alternative w-fit" mat-ripple>
            <div class="flex flex-row items-center space-x-1">
              <iconify-icon icon="material-symbols:visibility-outline"></iconify-icon>
              <span>Leer</span>
            </div>
          </button>
          <button type="button" class="button danger-alternative" mat-ripple>
            <div class="flex flex-row items-center space-x-1">
              <iconify-icon icon="material-symbols:visibility-off-outline-rounded"></iconify-icon>
              <span>Desabilitar</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export default class ReviewsComponent implements OnInit{
  private routeService: RoutesService = inject(RoutesService);

  ngOnInit(): void {
    this.routeService.setTitle('Reseñas');
  }
}
