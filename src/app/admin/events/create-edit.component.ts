import { Component, inject, OnInit } from '@angular/core';
import { FormComponent } from './form.component';
import { RoutesService } from '../routes.service';
import { ActivatedRoute } from '@angular/router';

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
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {

    const editMode: boolean | undefined = this.activatedRoute.snapshot.data['editMode'];

    if(editMode === true) {
      this.routeService.setTitle("Editar Evento");
    } else {
      this.routeService.setTitle("Crear Evento");
    }

    this.routeService.setGoBackRoute('/admin/events');
  }
}
