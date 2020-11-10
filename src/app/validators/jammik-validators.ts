import { FormControl, ValidationErrors } from '@angular/forms';

/**
 * Gemaakt door Jan
 */
export class JammikValidators {

  static notOnlyWhitespace(control: FormControl): ValidationErrors {

    if (control.value != null && control.value.trim().length === 0) {
      return { 'notOnlyWhitespace': true };
    } else {
      return null;
    }
  }

  static cannotBeGeen(control: FormControl): ValidationErrors {

    if(control.value !== null && control.value === 'Geen') {
      return { 'cannotBeGeen': true };
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

  static cannotBeNegative(control: FormControl): ValidationErrors {

    let value: number = Number.parseFloat(control.value);
    if(value <= 0) return { 'valueCannotBeNegative': true };
    else return null;
  }

  // file extension validation
  static mustBePngJpgOrJpeg(control: FormControl): ValidationErrors {

    const regexp = new RegExp(/^(png|jpg|jpeg)$/);

    if(control.value != null) {

      const nameLength: number = control.value.length;
      const beginPosition: number = control.value.includes('.jpeg') ? nameLength -4 : nameLength -3;
      const extension: string = control.value.substring(beginPosition);

      return (regexp.test(extension) ? null : { 'mustBePngJpgOrJpeg': true });
    } else {
      return { 'mustBePngJpgOrJpeg': true };
    }
  }
}
