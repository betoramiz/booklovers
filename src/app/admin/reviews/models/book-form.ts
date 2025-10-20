import { FormControl } from '@angular/forms';

export interface BookForm {
  id: FormControl<number>;
  name: FormControl<string>;
  author: FormControl<string>;
  genre: FormControl<number>;
}
