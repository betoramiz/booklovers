import { Component, CUSTOM_ELEMENTS_SCHEMA, input, linkedSignal } from '@angular/core';
import 'iconify-icon';

@Component({
  selector: 'start-rate',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div>
      @for (start of startArray(); track $index) {
        <iconify-icon icon="material-symbols:star-rate" class="text-yellow-500"></iconify-icon>
      }
    </div>
  `,
  styles: ``
})
export class StartRateComponent {
  rate = input.required<number>();

  startArray = linkedSignal(() => Array.from({ length: this.rate() }));
}
