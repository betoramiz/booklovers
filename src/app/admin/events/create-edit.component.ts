import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from './form.component';
import { RoutesService } from '../routes.service';

@Component({
  selector: 'app-create-edit',
  imports: [
    FormComponent
  ],
  template: `
    <event-form></event-form>
  `,
  styles: ``
})
export default class CreateEditComponent implements OnInit {

  private routeService: RoutesService = inject(RoutesService);
  ngOnInit(): void {
    this.routeService.setTitle("Crear Evento");
    this.routeService.setGoBackRoute('/admin/events');
  }
}
