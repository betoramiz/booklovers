import { FormControl } from '@angular/forms';

export interface LoginForm {
  user: FormControl<string>;
  password: FormControl<string>;
}
