//*************************************************************************************************//
// Validator sprawdzający, czy wartość pola input nie występuje w przekazanych danych
//*************************************************************************************************//

import { AbstractControl, ValidatorFn } from '@angular/forms';

export function isForbidden(forbiddenValues: string[]): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if ( (c.value !='') && (forbiddenValues.indexOf(c.value) !== -1)) { // puste pole input: string jest poprawne
      return { 'forbiddenValues': true };
    }
    return null;
  };
}