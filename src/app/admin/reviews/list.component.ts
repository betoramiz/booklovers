import { Component, inject, OnInit } from '@angular/core';
import { RoutesService } from '../routes.service';

@Component({
  selector: 'app-list',
  imports: [],
  template: `
    <p>
      list works!
    </p>
  `,
  styles: ``
})
export default class ListComponent implements OnInit{
  private routeService: RoutesService = inject(RoutesService);

  ngOnInit(): void {
      this.routeService.setTitle('Reseñas');
      this.routeService.setGoBackRoute('/admin/reviews');
  }
}

