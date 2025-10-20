import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { RoutesService } from '../routes.service';
import { MatRipple } from '@angular/material/core';
import 'iconify-icon';
import { StartRateComponent } from '../../shared/components/start-rate.component';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { ReviewsService } from './reviews.service';
import { BookItem } from './models/book-item';

@Component({
  selector: 'app-reviews',
  imports: [
    MatRipple,
    StartRateComponent,
    MatList,
    MatListItem,
    RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section class="admin-section">
      <button class="button primary full-width" mat-ripple routerLink="create">Agregar Libro</button>
      <div class="mt-5">
        <h2 class="title">Libros reseñados</h2>
        @for (book of books(); track book.id) {
          <mat-list>
            <mat-list-item mat-ripple [routerLink]="['list', book.id]">
              <div class="flex justify-between items-center">
                <header>{{ book.name }} - ({{ book.reviews }})</header>
              </div>
            </mat-list-item>
          </mat-list>
        }
      </div>
    </section>

<!--    <section class="admin-section">-->
<!--      <h2 class="title">Cadaver Exquisitio</h2>-->
<!--      <div class="flex flex-col border border-gray-300 rounded-xl p-2 bg-[#f5f5dc]">-->
<!--        <section class="flex flex-row justify-between mb-3">-->
<!--          <div class="font-semibold">Beto Ramirez</div>-->
<!--          <start-rate [rate]="3"></start-rate>-->
<!--        </section>-->
<!--        <p class="text-gray-500 text-justify font-medium mb-4">Muy buena libro, me gusto por que lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>-->
<!--        <div class="flex flex-row justify-between">-->
<!--          <button type="button" class="button primary-alternative w-fit" mat-ripple>-->
<!--            <div class="flex flex-row items-center space-x-1">-->
<!--              <iconify-icon icon="material-symbols:visibility-outline"></iconify-icon>-->
<!--              <span>Leer</span>-->
<!--            </div>-->
<!--          </button>-->
<!--          <button type="button" class="button danger-alternative" mat-ripple>-->
<!--            <div class="flex flex-row items-center space-x-1">-->
<!--              <iconify-icon icon="material-symbols:visibility-off-outline-rounded"></iconify-icon>-->
<!--              <span>Desabilitar</span>-->
<!--            </div>-->
<!--          </button>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->
  `,
  styles: ``
})
export default class ReviewsComponent implements OnInit{
  private routeService: RoutesService = inject(RoutesService);
  private reviewService: ReviewsService = inject(ReviewsService);

  books = signal<BookItem[]>([]);

  async ngOnInit(): Promise<void> {
    this.routeService.setTitle('Reseñas');

    const books = await this.reviewService.getBooks();
    if(books.error) {
      return;
    }

    this.books.set(books.value);

  }
}
