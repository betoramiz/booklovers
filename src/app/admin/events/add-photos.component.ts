import { Component, inject, Input, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { RoutesService } from '../routes.service';
import { EventService } from './event.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgOptimizedImage } from '@angular/common';
import { SpinnerComponent } from '../../shared/components/spinner.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { PhotoUrl } from './models/photoUrl';

@Component({
  selector: 'app-add-photos',
  imports: [
    NgOptimizedImage,
    SpinnerComponent,
    MatGridList,
    MatGridTile,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  template: `
    <section class="admin-section">
      <h2 class="title">Fotos del evento </h2>
      <div class="my-4">
        <button class="button primary full-width" (click)="photoEvent.click()" [disabled]="photos().length >= photosLimit">Agregar Foto</button>
        <input type="file" name="photo-event" id="photo-event" hidden="hidden"
               accept="image/jpeg, image/png, image/gif, image/webp" #photoEvent (change)="onFileChange($event)">
      </div>
      <mat-grid-list cols="2" gutterSize="10" rowHeight="2:3">
        @for (photo of photos(); track photo) {
          <mat-grid-tile>
            <div class="flex flex-col">
              <img [ngSrc]="photo.signedUrl"
                   width="200"
                   height="200"
                   alt="Foto del evento"
                   priority />
              <div class="flex justify-between px-2">
                <button (click)="delete(photo.path)">
                  <span class="material-symbols-outlined">delete</span>
                </button>
                <button (click)="openPhoto(photo.signedUrl)">
                  <span class="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>
          </mat-grid-tile>
        }
      </mat-grid-list>
      <div class="flex flex-row gap-2">
      </div>
    </section>
    @if (loading()) {
      <club-spinner></club-spinner>
    }

    <ng-template #dialogHtml>
      <h2 mat-dialog-title class="text-xl font-black">Eliminar foto</h2>
      <mat-dialog-content>
        <p>Estas segura que deseas eliminar esta foto?</p>
      </mat-dialog-content>
      <mat-dialog-actions>
        <div class="flex flex-row gap-2 justify-between">
          <button mat-dialog-close class="button danger-alternative">Cancelar</button>
          <button [mat-dialog-close]="true" class="button primary-alternative">Eliminar</button>
        </div>
      </mat-dialog-actions>
    </ng-template>

    <ng-template #photoDialog>
      <div>
        <img [ngSrc]="dialogSignedUrl()" width="500" height="500" alt="photo">
      </div>
    </ng-template>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None
})
export default class AddPhotosComponent implements OnInit {

  private routeService: RoutesService = inject(RoutesService);
  private eventService: EventService = inject(EventService);
  private snackBarService = inject(MatSnackBar);
  private dialog: MatDialog = inject(MatDialog);

  photos = signal<PhotoUrl[]>([]);
  loading = signal<boolean>(false);
  dialogSignedUrl = signal<string>('');
  @Input() id!: number;
  photosLimit = 5;
  @ViewChild('dialogHtml') dialogHtml!: any;
  @ViewChild('photoDialog') photoDialog!: any;

  async ngOnInit(): Promise<void> {
    this.routeService.setGoBackRoute('/admin/events');
    const photosUlr = await this.getPhotosUrl();
    this.photos.set(photosUlr);
  }

  async getPhotosUrl(): Promise<PhotoUrl[]> {
    if(this.id === undefined || this.id === null || this.id === 0) {
      return [];
    }

    this.loading.set(true);

    const photos = await this.eventService.getFiles(this.id.toString());

    if(photos.ok) {
      this.loading.set(false);
      return photos.value.filter(url => !url.path.includes('emptyFolderPlaceholder'));
    } else {
      this.loading.set(false);
      return [];
    }
  }

  async onFileChange($event: Event): Promise<void> {
    const imageInput = $event.target as HTMLInputElement;
    if(imageInput.files === null) {
      return;
    }
    const file = imageInput.files[0];
    const fileName = this.normalizeFileName(file.name);
    const path =  `${this.id}/${fileName}`;
    const result = await this.eventService.uploadFile(path, file);
    if(result.ok) {
      const photosUlr = await this.getPhotosUrl();
      this.photos.set(photosUlr);

      this.snackBarService.open('Foto subida correctamente', 'Cerrar', { duration: 3000 });
    } else {
      this.snackBarService.open('Error al subir la foto', 'Cerrar', { duration: 3000 });
    }
  }

  delete(fileName: string): void {
    const dialogResult = this.dialog.open(this.dialogHtml);
    dialogResult.afterClosed().subscribe(async result => {
      if(result) {
        this.loading.set(true);
        const result = await this.eventService.deleteFile(this.id.toString(), fileName);
        if(result.ok) {
          const photosUlr = await this.getPhotosUrl();
          this.photos.set(photosUlr);

          this.snackBarService.open('Foto borrada correctamente', 'Cerrar', { duration: 3000 });
        } else {
          this.snackBarService.open('Error al borrar la foto', 'Cerrar', { duration: 3000 });
        }
        this.loading.set(false);
      }
    });
  }

  openPhoto(signedUrl: string): void {
    this.dialogSignedUrl.set(signedUrl);
    this.dialog.open(this.photoDialog);
  }

  private normalizeFileName(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    let base = lastDot > 0 ? filename.slice(0, lastDot) : filename;
    let ext = lastDot > 0 ? filename.slice(lastDot + 1) : '';

    // remove diacritics
    base = base.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // spaces -> -
    base = base.replace(/\s+/g, '-');
    // allow only letters, numbers, underscore and dash in the base
    base = base.replace(/[^a-zA-Z0-9_-]/g, '');
    // collapse multiple dashes and trim leading/trailing dashes/underscores
    base = base.replace(/-+/g, '-').replace(/^[-_]+|[-_]+$/g, '');
    // sanitize extension
    ext = ext.toLowerCase().replace(/[^a-z0-9]/g, '');

    return (base + (ext ? '.' + ext : '')).toLowerCase();
  }

}
