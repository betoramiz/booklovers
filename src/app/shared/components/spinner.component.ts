import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'club-spinner',
  imports: [
    MatProgressSpinnerModule
  ],
  template: `
    <div class="overlay">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: `
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
  `
})
export class SpinnerComponent {

}
