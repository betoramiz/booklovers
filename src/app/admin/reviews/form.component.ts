import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookForm } from './models/book-form';
import { MatFormField, MatOption, MatSelect } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { NgClass } from '@angular/common';
import { ReviewsService } from './reviews.service';
import { CreateBook } from './types/book';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerComponent } from '../../shared/components/spinner.component';

@Component({
  selector: 'book-form',
  imports: [
    MatSelect,
    MatOption,
    MatFormField,
    RouterLink,
    ReactiveFormsModule,
    MatRipple,
    NgClass,
    SpinnerComponent
  ],
  template: `
    <section class="admin-section">
      <h2 class="title">Agregar Libro</h2>
      <form [formGroup]="bookForm" (ngSubmit)="onSave()">
        <div class="form-item">
          <label for="book-name">Nombre</label>
          <input id="book-name" class="form-item-input" type="text" formControlName="name" >
        </div>

        <div class="form-item">
          <label for="book-author">Autor</label>
          <input id="book-author" class="form-item-input" type="text" formControlName="author">
        </div>

        <div class="form-item">
          <label for="book-author">Genero</label>
          <mat-form-field class="w-full">
            <mat-select formControlName="genre" placeholder="Seleccione la categoria">
              <mat-option value="fantasy">Fantasia</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <div class="form-item space-y-6">
          <button type="submit" class="button primary full-width" mat-ripple
                  [matRippleDisabled]="bookForm.invalid"
                  [disabled]="bookForm.invalid"
                  [ngClass]="{'disabled': bookForm.invalid}">Crear</button>
          <button type="button" class="button full-width" routerLink="/admin/reviews">Cancelar</button>
        </div>
      </form>
    </section>

    @if (isLoading()) {
      <club-spinner></club-spinner>
    }
  `,
  styles: ``
})
export class FormComponent implements OnInit{

  private reviewService: ReviewsService = inject(ReviewsService);
  private router: Router = inject(Router);

  snackBak: MatSnackBar = inject(MatSnackBar);
  formBuilder: FormBuilder = inject(FormBuilder);
  bookForm: FormGroup<BookForm> = this.createForm();

  isLoading = signal(false);
  public ngOnInit(): void {
  }

  async onSave(): Promise<void> {
    if(this.bookForm.invalid) {
      return;
    }

    this.isLoading.set(true);
    const { name, author, genre } = this.bookForm.value;
    const book: CreateBook = {
      name: name!,
      author: author!,
      month: 1,
      image: '',
    }
    const result = await this.reviewService.createBook(book);

    if(result.error) {
      this.snackBak.open('No se pudo crear el libro', 'Cerrar', { duration: 3000 });
      this.isLoading.set(false);
      return;
    }

    this.snackBak.open('Libro creado con exito', 'Cerrar', { duration: 3000 });
    this.bookForm.reset();
    this.isLoading.set(false);
    await this.router.navigate(['/admin/reviews']);
  }

  private createForm(): FormGroup<BookForm> {
    return this.formBuilder.group<BookForm>({
      id: this.formBuilder.nonNullable.control(0),
      name: this.formBuilder.nonNullable.control('', [Validators.required]),
      author: this.formBuilder.nonNullable.control('', [Validators.required]),
      genre: this.formBuilder.nonNullable.control(0, [Validators.required]),
    });
  }
}
