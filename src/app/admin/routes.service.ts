import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private rootRoutes = ['/admin/events', '/admin/notifications', '/admin/settings', '/admin/reviews'];

  title = signal<string>('');
  goBackRoute = signal<string>('/admin');
  showBackButton = signal<boolean>(false);


  constructor() {
    effect(() => {
      if (this.rootRoutes.some(x => x == this.goBackRoute())) {
       this.showBackButton.set(true);
      } else {
        this.showBackButton.set(false);
      }
    })
  }

  setTitle(title: string): void {
    this.title.set(title);
  }

  setGoBackRoute(route: string): void {
    this.goBackRoute.set(route);
  }

  // showBackButton(): void {
  //   this.backButton.set(true);
  // }
  //
  // hideBackButton(): void {
  //   this.backButton.set(false);
  // }
}
