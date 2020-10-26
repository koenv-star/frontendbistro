import { FormControl, ValidationErrors } from '@angular/forms';

export class JammikValidators {

  static notOnlyWhitespace(control: FormControl): ValidationErrors {

    if (control.value != null && control.value.trim().length === 0) {

      return { 'notOnlyWhitespace': true };
    } else {

      return null;
    }
  }

  static valueCannotBeOpeningsuur(control: FormControl): ValidationErrors {

    if (control.value != null && control.value === 'Openingsuur:')
      return { 'valueCannotBeOpeningsuur': true };

    else
      return null;
  }

  static valueCannotBeSluitingsuur(control: FormControl): ValidationErrors {

    if (control.value != null && control.value === 'Sluitingsuur:')
    return { 'valueCannotBeSluitingsuur': true };

  else
    return null;
  }
}
