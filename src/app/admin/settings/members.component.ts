import { Component, inject, OnInit } from '@angular/core';
import { RoutesService } from '../routes.service';

@Component({
  selector: 'app-members',
  imports: [],
  template: `
    <p>
      members works!
    </p>
  `,
  styles: ``
})
export default class MembersComponent implements OnInit {
  private routeService: RoutesService = inject(RoutesService);

  ngOnInit(): void {
    this.routeService.setTitle('Miembros');
    this.routeService.setGoBackRoute('/admin/settings');
  }
}


