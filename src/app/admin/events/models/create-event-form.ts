import { FormControl } from '@angular/forms';

export interface CreateEventForm {
  name: FormControl<string>;
  when: FormControl<Date>;
  time: FormControl<string>;
  where: FormControl<string>;
  description: FormControl<string>;
  mapUrl: FormControl<string|null>;
}
