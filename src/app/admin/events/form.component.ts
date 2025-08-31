import { Component } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'event-form',
  imports: [
    MatRipple
  ],
  template: `
    <form>
      <div class="form-item">
        <label for="eventName">Nombre del Evento</label>
        <input type="text" id="eventName" class="form-item-input" placeholder="ej. Libro: El Jardin Secreto">
      </div>

      <div class="grid grid-cols-2 gap-8">
        <div class="form-item">
          <label for="date">Fecha</label>
          <input type="date" id="date" min="today" class="form-item-input">
        </div>


        <div class="form-item">
          <label for="time">Hora</label>
          <input type="time" id="time" class="form-item-input">
        </div>
      </div>

      <div class="form-item">
        <label for="location">Lugar</label>
        <input type="text" id="location" class="form-item-input">
      </div>

      <div class="form-item">
        <label for="map">Mapa</label>
        <input type="url" id="map" class="form-item-input" placeholder="ulr de google maps">
      </div>

      <div class="form-item">
        <label for="description">Descripcion</label>
        <textarea class="form-item-input" id="description" cols="30" rows="4"></textarea>
      </div>

      <button type="button" class="button primary full-width flex items-center justify-center tracking-widest" mat-ripple>
        <span class="material-symbols-outlined">add</span>
        Crear
      </button>
    </form>
  `,
  styles: ``
})
export class FormComponent {

}
