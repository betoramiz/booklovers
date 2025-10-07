import { FormControl } from '@angular/forms';

export interface NotificationForm {
  name: FormControl<string>;
  message: FormControl<string>;
  type: FormControl<number|null>;
}
