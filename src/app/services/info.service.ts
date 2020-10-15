//*************************************************************************************************//
// Serwis odpowiedzialny za wyświetlanie komunikatów za pomocą SnackBara od Angular Material.
// Powstał, gdyż snackBar był często używany i niepotrzebnie duplikował kod.
//*************************************************************************************************//
import { Injectable } from '@angular/core';
import { MatSnackBar, TextOnlySnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class InfoService {

  constructor(private _snackBar: MatSnackBar) {}

  msg(message: string): MatSnackBarRef<TextOnlySnackBar>{       // funkcja wyświetlająca informację w formie dymka na dole strony, po danym czasie znika
    return this._snackBar.open(message, '', {duration: 5000});
  }
}
