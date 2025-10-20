import { Component } from '@angular/core';
import { FormComponent } from './form.component';

@Component({
  selector: 'app-create-edit',
  imports: [
    FormComponent
  ],
  template: `
    <book-form></book-form>
  `,
  styles: ``
})
export default class CreateEditComponent {

}
