import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <div class="flex flex-col items-center p-6 bg-slate-50">
      <img src="booklovers-heart.png">
      <div class="flex flex-col items-center justify-center text-center">
        <p class="text-2xl font-bold">Book Lover's Club</p>
      </div>
    </div>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-3">Nuestro Club</h2>
      <p class="text-base font-normal text-justify">
        ¡Hola, amante de la lectura! Somos un grupo de apasionados por los libros que se reúne mensualmente.

        Nos encanta platicar sobre nuestras obras favoritas, compartir puntos de vista y conectar con gente que
        comparte esta misma pasión. Acompáñanos para disfrutar de charlas amenas y celebrar las historias que nos unen.
      </p>
    </div>

    <div class="px-6">
      <h2 class="text-xl font-bold mb-3">
        Como unirte al club
      </h2>
    </div>
    <div class="space-y-4">
      <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-lg">
        <div
          class="flex items-center justify-center size-12 bg-white rounded-full">
          <span class="material-symbols-outlined">mail</span>
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-base font-medium">Subscribete al boletin</p>
          <p class=" text-sm font-normal">Julio 15, 2024</p>
        </div>
      </div>
      <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-lg">
        <div
          class="flex items-center justify-center size-12 bg-white rounded-full">
          <span class="material-symbols-outlined">tag</span>
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-base font-medium">Siguenos en redes sociales</p>
          <p class=" text-sm font-normal  ">Julio 20, 2024</p>
        </div>
      </div>
      <div class="flex items-center gap-4 bg-slate-50 p-4 rounded-lg">
        <div
          class="flex items-center justify-center size-12 bg-white rounded-full">
          <span class="material-symbols-outlined">groups</span>
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-base font-medium">Asiste a las reuniones mensuales</p>
          <p class=" text-sm font-normal">Julio 25, 2024</p>
        </div>
      </div>
    </div>

    <div class="px-6 mt-8">
      <h2 class="text-xl font-bold mb-3">
        Reseñas de libros
      </h2>
    </div>
  `,
  styles: ``
})
export default class HomeComponent {

}
